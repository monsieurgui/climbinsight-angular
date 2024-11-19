import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/climbinsight/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    loginError: string | null = null;
    registrationEnabled = true;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    ngOnInit(): void {
        // If user is already logged in, redirect to dashboard
        if (this.authService.currentUserValue) {
            this.router.navigate(['/dashboard']);
        }
        
        // Check registration status
        this.authService.checkRegistrationStatus().subscribe({
            next: (enabled) => {
                this.registrationEnabled = enabled;
            },
            error: (error) => {
                console.error('Failed to check registration status:', error);
            }
        });
    }

    isFieldInvalid(field: string): boolean {
        const formControl = this.loginForm.get(field);
        return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
    }

    onInputChange(): void {
        this.loginError = null;
    }

    async onSubmit(): Promise<void> {
        this.loginError = null;

        if (this.loginForm.invalid) {
            Object.keys(this.loginForm.controls).forEach(key => {
                const control = this.loginForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        try {
            this.loading = true;
            const { email, password, rememberMe } = this.loginForm.value;
            await this.authService.login(email, password, rememberMe).toPromise();
            
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
            await this.router.navigate([returnUrl]);

            this.messageService.add({
                severity: 'success',
                summary: 'Welcome',
                detail: 'Login successful!'
            });
        } catch (error: any) {
            this.loginError = 'Invalid email or password. Please try again.';
            
            this.messageService.add({
                severity: 'error',
                summary: 'Login Failed',
                detail: this.loginError
            });
        } finally {
            this.loading = false;
        }
    }

    async signInWithGoogle(): Promise<void> {
        try {
            this.loading = true;
            // Implement Google OAuth2 login
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Google sign-in failed'
            });
        } finally {
            this.loading = false;
        }
    }

    async signInWithFacebook(): Promise<void> {
        try {
            this.loading = true;
            // Implement Facebook OAuth2 login
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Facebook sign-in failed'
            });
        } finally {
            this.loading = false;
        }
    }
}
