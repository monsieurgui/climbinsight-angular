import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private sessionSubject = new BehaviorSubject<boolean>(false);
    private sessionTimeout: any;

    constructor(private cookieService: CookieService) {
        this.checkExistingSession();
    }

    private checkExistingSession(): void {
        const sessionId = this.cookieService.get('session_id');
        if (sessionId) {
            this.sessionSubject.next(true);
        }
    }

    createSession(user: User, sessionId: string, rememberMe: boolean = false): void {
        // Clear any existing session timeout
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }

        const expirationDate = new Date();
        if (rememberMe) {
            expirationDate.setDate(expirationDate.getDate() + 30); // 30 days
        } else {
            expirationDate.setHours(expirationDate.getHours() + 24); // 24 hours
        }

        // Set session cookie
        this.cookieService.set('session_id', sessionId, {
            expires: expirationDate,
            path: '/',
            secure: true,
            sameSite: 'Strict'
        });
        
        // Store user preferences
        this.cookieService.set('user_preferences', JSON.stringify({
            theme: 'light',
            language: 'en',
            notifications: true,
            rememberMe: rememberMe
        }), {
            expires: expirationDate,
            path: '/',
            secure: true,
            sameSite: 'Strict'
        });

        this.sessionSubject.next(true);

        // Set up session timeout
        const timeUntilExpiry = expirationDate.getTime() - new Date().getTime();
        this.sessionTimeout = setTimeout(() => {
            this.clearSession();
        }, timeUntilExpiry);
    }

    clearSession(): void {
        // Clear cookies
        this.cookieService.delete('session_id', '/');
        this.cookieService.delete('user_preferences', '/');

        // Clear local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('currentUser');

        // Clear timeout
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }

        this.sessionSubject.next(false);
    }

    isSessionActive(): Observable<boolean> {
        return this.sessionSubject.asObservable();
    }

    getSessionPreferences(): any {
        const prefsStr = this.cookieService.get('user_preferences');
        if (prefsStr) {
            try {
                return JSON.parse(prefsStr);
            } catch (e) {
                console.error('Error parsing user preferences:', e);
                return null;
            }
        }
        return null;
    }
} 