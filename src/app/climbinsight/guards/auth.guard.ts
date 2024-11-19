import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        console.log('AuthGuard checking user:', currentUser); // Debug log
        
        if (currentUser) {
            // check if route is restricted by role
            if (route.data['roles'] && !route.data['roles'].includes(currentUser.role?.name)) {
                console.log('Access denied - invalid role'); // Debug log
                this.messageService.add({
                    severity: 'error',
                    summary: 'Access Denied',
                    detail: 'You do not have permission to access this page'
                });
                this.router.navigate(['/auth/access']);
                return false;
            }
            return true;
        }

        console.log('User not authenticated, redirecting to login'); // Debug log
        this.messageService.add({
            severity: 'warn',
            summary: 'Authentication Required',
            detail: 'Please log in to access this page'
        });
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
} 