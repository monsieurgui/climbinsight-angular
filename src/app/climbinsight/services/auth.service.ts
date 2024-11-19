import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import {  AuthResponse, 
    LoginRequest, 
    RegisterRequest, 
    TokenRefreshResponse } from '../interfaces/auth.interface';
import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface LoginResponse {
    access: string;    // JWT access token
    refresh: string;   // JWT refresh token
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;
    private refreshTokenTimeout: any;
    private registrationEnabled = false;

    constructor(
        private apiService: ApiService,
        private sessionService: SessionService,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    private getUserFromStorage(): User | null {
        const userStr = localStorage.getItem('currentUser');
        if (!userStr) {
            return null;
        }
        try {
            return JSON.parse(userStr);
        } catch (e) {
            // If there's invalid JSON in storage, clear it
            localStorage.removeItem('currentUser');
            return null;
        }
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    register(registerData: RegisterRequest): Observable<any> {
        return this.apiService.post(API_ENDPOINTS.AUTH.REGISTER, registerData).pipe(
            catchError(error => {
                console.log('Registration error in service:', error);
                
                if (error.status === 500) {
                    const errorMessage = error.error?.detail || error.error?.message || error.message;
                    console.log('Error message:', errorMessage);
                    
                    if (errorMessage?.includes('UNIQUE constraint failed: users.username')) {
                        return throwError(() => ({
                            status: error.status,
                            message: 'This email is already registered. Please try logging in instead.'
                        }));
                    }
                }
                return throwError(() => ({
                    status: error.status,
                    message: error.error?.detail || 'Registration failed. Please try again.'
                }));
            })
        );
    }

    login(email: string, password: string, rememberMe: boolean = false): Observable<LoginResponse> {
        return this.apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, { email, password })
            .pipe(
                tap(response => {
                    console.log('Auth response received:', response);
                    
                    // Store the tokens
                    localStorage.setItem('access_token', response.access);
                    if (rememberMe) {
                        localStorage.setItem('refresh_token', response.refresh);
                    }
                    
                    // Decode the JWT to get user info
                    const decodedToken = this.decodeJWT(response.access);
                    const user: User = {
                        id: decodedToken.user_id,
                        email: decodedToken.email,
                        username: decodedToken.email,
                        primary_login_method: decodedToken.primary_login_method
                    };
                    
                    // Store user info
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    
                    console.log('Auth state updated with user:', user);
                }),
                catchError(error => {
                    console.error('Login error in service:', error);
                    return throwError(() => error);
                })
            );
    }

    private decodeJWT(token: string): any {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Error decoding JWT:', e);
            return {};
        }
    }

    loginWithGoogle(token: string): Observable<AuthResponse> {
        return this.apiService.post<AuthResponse>(`${environment.apiUrl}/auth/google`, { token })
            .pipe(
                tap(response => {
                    localStorage.setItem('currentUser', JSON.stringify(response.user));
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    this.currentUserSubject.next(response.user);
                    this.startRefreshTokenTimer();
                })
            );
    }

    loginWithFacebook(token: string): Observable<AuthResponse> {
        return this.apiService.post<AuthResponse>(`${environment.apiUrl}/auth/facebook`, { token })
            .pipe(
                tap(response => {
                    localStorage.setItem('currentUser', JSON.stringify(response.user));
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    this.currentUserSubject.next(response.user);
                    this.startRefreshTokenTimer();
                })
            );
    }

    logout(): void {
        // Clear all stored data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Clear the BehaviorSubject
        this.currentUserSubject.next(null);
        
        // Navigate to login page
        this.router.navigate(['/auth/login']);
    }

    refreshToken(): Observable<TokenRefreshResponse> {
        const refresh_token = localStorage.getItem('refresh_token');
        if (!refresh_token) {
            return throwError(() => new Error('No refresh token available'));
        }

        return this.apiService.post<TokenRefreshResponse>(
            API_ENDPOINTS.AUTH.REFRESH_TOKEN, 
            { refresh_token }
        ).pipe(
            tap(response => {
                localStorage.setItem('access_token', response.access_token);
                this.startRefreshTokenTimer();
            })
        );
    }

    requestPasswordReset(email: string): Observable<any> {
        return this.apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }).pipe(
            catchError(error => {
                if (error.status === 404) {
                    return throwError(() => new Error('No account found with this email address.'));
                }
                return throwError(() => new Error(error.error?.detail || 'Failed to process request.'));
            })
        );
    }

    confirmPasswordReset(token: string, newPassword: string): Observable<void> {
        return this.apiService.post<void>(
            API_ENDPOINTS.AUTH.PASSWORD.RESET_CONFIRM, 
            { token, new_password: newPassword }
        );
    }

    verifyEmail(token: string): Observable<void> {
        return this.apiService.post<void>(
            API_ENDPOINTS.AUTH.VERIFY_EMAIL, 
            { token }
        );
    }

    private startRefreshTokenTimer() {
        // Parse the JWT token to get the expiration time
        const token = localStorage.getItem('access_token');
        if (!token) return;

        const jwtToken = JSON.parse(atob(token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000); // Refresh 1 minute before expiry
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
        }
    }

    private handleAuthResponse(response: AuthResponse, rememberMe: boolean = false): void {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        
        this.sessionService.createSession(
            response.user,
            response.access_token,
            rememberMe
        );
        
        this.currentUserSubject.next(response.user);
        this.startRefreshTokenTimer();
    }

    get isRegistrationEnabled(): boolean {
        return this.registrationEnabled;
    }

    checkRegistrationStatus(): Observable<boolean> {
        return this.apiService.get<{ enabled: boolean }>(API_ENDPOINTS.AUTH.REGISTRATION_STATUS)
            .pipe(
                tap(response => this.registrationEnabled = response.enabled),
                map(response => response.enabled)
            );
    }
} 