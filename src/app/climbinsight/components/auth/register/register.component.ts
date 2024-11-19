import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/climbinsight/services/auth.service';
import { RegisterRequest } from 'src/app/climbinsight/interfaces/auth.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  registrationError: string | null = null;
  isEmailTaken = false;
  registrationEnabled = false;

  constructor(
    public layoutService: LayoutService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.checkRegistrationStatus();
  }

  private async checkRegistrationStatus(): Promise<void> {
    try {
      this.registrationEnabled = await this.authService.checkRegistrationStatus().toPromise();
      if (!this.registrationEnabled) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Registration Disabled',
          detail: 'New user registration is currently disabled. Please contact an administrator.'
        });
        this.router.navigate(['/auth/login']);
      }
    } catch (error) {
      console.error('Failed to check registration status:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to check registration status'
      });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.registerForm.get(field);
    return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
  }

  async onSubmit(): Promise<void> {
    this.registrationError = null;
    this.isEmailTaken = false;

    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    try {
      this.loading = true;
      const { email, password } = this.registerForm.value;
      
      const registerData: RegisterRequest = {
        email,
        password,
        username: email
      };

      await this.authService.register(registerData).toPromise();
      
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Registration successful! Please log in with your credentials.'
      });
      await this.router.navigate(['/auth/login']);
    } catch (error: any) {
      console.log('Registration error in component:', error);
      
      if (error.status === 500) {
        this.isEmailTaken = true;
        this.registrationError = 'This email address is already registered.';
        
        const emailControl = this.registerForm.get('email');
        if (emailControl) {
          emailControl.setErrors({ duplicate: true });
          emailControl.markAsTouched();
        }
      } else {
        this.registrationError = error.message || 'An unexpected error occurred. Please try again.';
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Registration Failed',
        detail: this.registrationError
      });
    } finally {
      this.loading = false;
    }
  }

  getEmailErrorMessage(): string {
    const control = this.registerForm.get('email');
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Email is required';
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['duplicate']) {
        return 'This email is already registered';
      }
    }
    return '';
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      this.loading = true;
      // Implement Google OAuth2 registration
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Google sign-up failed'
      });
    } finally {
      this.loading = false;
    }
  }

  async signUpWithFacebook(): Promise<void> {
    try {
      this.loading = true;
      // Implement Facebook OAuth2 registration
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Facebook sign-up failed'
      });
    } finally {
      this.loading = false;
    }
  }

  onEmailInput(): void {
    this.registrationError = null;
    this.isEmailTaken = false;
    
    const emailControl = this.registerForm.get('email');
    if (emailControl?.errors?.['duplicate']) {
      const { duplicate, ...otherErrors } = emailControl.errors;
      emailControl.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
    }
  }
}
