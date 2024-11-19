import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/climbinsight/services/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    providers: [MessageService]
})
export class ForgotpasswordComponent {
    forgotPasswordForm: FormGroup;
    loading = false;
    requestError: string | null = null;
    emailSent = false;
    showConfirmDialog = false;
    emailToReset = '';

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    isFieldInvalid(field: string): boolean {
        const control = this.forgotPasswordForm.get(field);
        return control ? control.invalid && (control.dirty || control.touched) : false;
    }

    onInputChange(): void {
        this.requestError = null;
    }

    onSubmit(): void {
        this.requestError = null;

        if (this.forgotPasswordForm.invalid) {
            Object.keys(this.forgotPasswordForm.controls).forEach(key => {
                const control = this.forgotPasswordForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        this.emailToReset = this.forgotPasswordForm.get('email')?.value;
        this.showConfirmDialog = true;
    }

    async confirmPasswordReset(): Promise<void> {
        try {
            this.loading = true;
            this.showConfirmDialog = false;
            
            await this.authService.requestPasswordReset(this.emailToReset).toPromise();
            
            this.emailSent = true;
            this.messageService.add({
                severity: 'success',
                summary: 'Email Sent',
                detail: 'Password reset instructions have been sent to your email.'
            });
        } catch (error: any) {
            this.requestError = error.message || 'Failed to send reset email. Please try again.';
            
            this.messageService.add({
                severity: 'error',
                summary: 'Request Failed',
                detail: this.requestError
            });
        } finally {
            this.loading = false;
        }
    }

    cancelPasswordReset(): void {
        this.showConfirmDialog = false;
    }
}
