import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private sessionSubject: BehaviorSubject<boolean>;
    public session: Observable<boolean>;

    constructor(private cookieService: CookieService) {
        this.sessionSubject = new BehaviorSubject<boolean>(this.hasValidSession());
        this.session = this.sessionSubject.asObservable();
    }

    private hasValidSession(): boolean {
        return this.cookieService.check('session_id');
    }

    createSession(user: User, sessionId: string, rememberMe: boolean = false): void {
        const expirationDate = new Date();
        if (rememberMe) {
            expirationDate.setDate(expirationDate.getDate() + 30); // 30 days
        } else {
            expirationDate.setHours(expirationDate.getHours() + 24); // 24 hours
        }

        // Set session cookie
        this.cookieService.set('session_id', sessionId, expirationDate, '/', undefined, true, 'Strict');
        
        // Store user preferences
        this.cookieService.set('user_preferences', JSON.stringify({
            theme: 'light',
            language: 'en',
            notifications: true
        }), expirationDate, '/', undefined, true, 'Strict');

        this.sessionSubject.next(true);
    }

    destroySession(): void {
        this.cookieService.delete('session_id', '/');
        this.cookieService.delete('user_preferences', '/');
        this.sessionSubject.next(false);
    }

    getSessionId(): string | null {
        return this.cookieService.get('session_id') || null;
    }

    getUserPreferences(): any {
        const preferences = this.cookieService.get('user_preferences');
        return preferences ? JSON.parse(preferences) : null;
    }

    updateUserPreferences(preferences: any): void {
        const currentPreferences = this.getUserPreferences() || {};
        const updatedPreferences = { ...currentPreferences, ...preferences };
        this.cookieService.set('user_preferences', JSON.stringify(updatedPreferences));
    }
} 