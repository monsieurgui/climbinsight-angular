import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ErrorResponse } from '../interfaces/api.interface';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if ([401, 403].includes(error.status)) {
                    this.authService.logout();
                    this.router.navigate(['/auth/login']);
                }

                const errorResponse = error.error as ErrorResponse;
                const errorMessage = errorResponse?.message || 'An error occurred';

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage
                });

                return throwError(() => errorResponse);
            })
        );
    }
} 