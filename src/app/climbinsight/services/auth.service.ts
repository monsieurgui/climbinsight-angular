import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User, AuthResponse } from '../interfaces/user.interface';
import { 
    LoginRequest, 
    RegisterRequest, 
    TokenRefreshResponse } from '../interfaces/auth.interface';
import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
    access: string;
    refresh: string;
    user: User;
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
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (e) {
                console.error('Error parsing stored user:', e);
                return null;
            }
        }
        return null;
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
                    
                    // Store tokens
                    localStorage.setItem('access_token', response.access);
                    if (rememberMe) {
                        localStorage.setItem('refresh_token', response.refresh);
                    }
                    
                    // Get user info from token
                    const decodedToken: any = jwtDecode(response.access);
                    const user: User = {
                        id: decodedToken.user_id,
                        email: decodedToken.email,
                        email_verified: decodedToken.email_verified || false,
                        username: decodedToken.username,
                        first_name: decodedToken.first_name || null,
                        last_name: decodedToken.last_name || null,
                        date_of_birth: decodedToken.date_of_birth || null,
                        phone: decodedToken.phone || null,
                        roles: decodedToken.roles || [],
                        emergency_contact: decodedToken.emergency_contact || null,
                        medical_info: decodedToken.medical_info || null,
                        certifications: decodedToken.certifications || null,
                        bio: decodedToken.bio || '',
                        profile_picture: decodedToken.profile_picture || '',
                        preferences: decodedToken.preferences || {},
                        notification_settings: decodedToken.notification_settings || {},
                        avatar: decodedToken.avatar || null,
                        climbing_level: decodedToken.climbing_level || null,
                        primary_login_method: decodedToken.primary_login_method || 'email',
                        role: decodedToken.role ? {
                            name: decodedToken.role,
                            permissions: decodedToken.permissions || []
                        } : undefined,
                        is_active: decodedToken.is_active || true,
                        is_staff: decodedToken.is_staff || false,
                        is_superuser: decodedToken.is_superuser || false,
                        date_joined: decodedToken.date_joined || new Date().toISOString()
                    };
                    
                    // Store user info
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                    // Create session
                    this.sessionService.createSession(
                        user,
                        response.access,
                        rememberMe
                    );
                    
                    // Update current user
                    this.currentUserSubject.next(user);
                    
                    // Start refresh timer
                    this.startRefreshTokenTimer();
                    
                    console.log('Auth state updated with user:', user);
                }),
                catchError(error => {
                    console.error('Login error in service:', error);
                    return throwError(() => error);
                })
            );
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
        // Clear all session data
        this.sessionService.clearSession();
        
        // Clear stored data
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('currentUser');
        
        // Clear the BehaviorSubject
        this.currentUserSubject.next(null);
        
        // Stop refresh timer
        this.stopRefreshTokenTimer();
        
        // Navigate to login page
        this.router.navigate(['/auth/login']);
    }

    refreshToken(): Observable<any> {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            return throwError(() => 'No refresh token available');
        }

        return this.apiService.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refresh_token: refreshToken })
            .pipe(
                tap(response => {
                    localStorage.setItem('access_token', response.access);
                    this.startRefreshTokenTimer();
                })
            );
    }

    requestPasswordReset(email: string): Observable<any> {
        return this.apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }).pipe(
            map(response => {
                console.log('Password reset success response:', response);
                return response;
            }),
            catchError(error => {
                console.error('Password reset error in service:', error);
                // If we get a 404, the account doesn't exist
                if (error.status === 404) {
                    throw new Error('No account found with this email address.');
                }
                // For any other error
                throw new Error(error.error?.detail || 'Failed to process request.');
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
        const token = localStorage.getItem('access_token');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            const expires = new Date(decodedToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000); // Refresh 1 minute before expiry
            this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
        }
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
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

    updateStoredUser(user: User): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }
} 