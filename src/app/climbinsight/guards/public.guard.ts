import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            // already logged in, redirect to dashboard
            this.router.navigate(['/dashboard']);
            return false;
        }
        return true;
    }
} 