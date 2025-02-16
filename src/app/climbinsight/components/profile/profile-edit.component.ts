import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { User, ProfileUpdateRequest } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

interface ValidationError {
    field_errors: { [key: string]: string[] };
    message: string;
}

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit {
    @Input() user: User | null = null;
    @Output() profileUpdated = new EventEmitter<void>();
    @Output() cancelEdit = new EventEmitter<void>();

    profileForm: FormGroup;
    maxDate: Date = new Date();
    loading = false;
    submitted = false;
    climbingLevels = [
        'Beginner',
        'Intermediate',
        'Advanced',
        'Expert',
        'Professional'
    ];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private messageService: MessageService,
        private router: Router
    ) {
        // Set maxDate to today
        this.maxDate.setHours(23, 59, 59, 999);

        // Initialize form with empty values
        this.initForm();
    }

    private initForm(): void {
        this.profileForm = this.fb.group({
            email: [{value: '', disabled: true}],
            username: [{value: '', disabled: true}],
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            date_of_birth: [null],
            phone: ['', [Validators.pattern('^[+]?[0-9]{10,13}$')]],
            bio: [''],
            climbing_level: [''],
            avatar: [''],
            emergency_contact: this.fb.group({
                name: [''],
                phone: ['', [Validators.pattern('^[+]?[0-9]{10,13}$')]],
                relationship: ['']
            }),
            medical_info: this.fb.group({
                conditions: [''],
                allergies: [''],
                medications: [''],
                blood_type: ['']
            })
        });
    }

    // Helper method to check if a field is invalid
    isFieldInvalid(fieldName: string): boolean {
        const field = this.profileForm.get(fieldName);
        return field ? 
            (field.invalid && (field.dirty || field.touched || this.submitted)) || 
            !!this.backendErrors[fieldName] : 
            false;
    }

    // Helper method to get error message
    getErrorMessage(fieldName: string): string {
        // Check for backend errors first
        if (this.backendErrors[fieldName]) {
            return this.backendErrors[fieldName][0];
        }

        const field = this.profileForm.get(fieldName);
        if (!field) return '';
        
        if (field.hasError('required')) {
            return `${fieldName.replace('_', ' ')} is required`;
        }
        if (field.hasError('pattern')) {
            return 'Please enter a valid phone number';
        }
        return '';
    }

    private formatDate(date: Date | null): string | null {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private getChangedValues(formValue: any): Partial<ProfileUpdateRequest> {
        const changes: Partial<ProfileUpdateRequest> = {};
        
        if (!this.user) return changes;

        // Compare simple fields
        const simpleFields: (keyof ProfileUpdateRequest)[] = [
            'first_name',
            'last_name',
            'phone',
            'bio',
            'climbing_level',
            'avatar'
        ];

        simpleFields.forEach(field => {
            if (formValue[field] !== this.user![field]) {
                changes[field] = formValue[field];
            }
        });

        // Compare date_of_birth
        const formDate = this.formatDate(formValue.date_of_birth);
        if (formDate !== this.user.date_of_birth) {
            changes.date_of_birth = formDate;
        }

        // Compare emergency_contact
        if (this.hasObjectChanges(formValue.emergency_contact, this.user.emergency_contact)) {
            changes.emergency_contact = formValue.emergency_contact;
        }

        // Compare medical_info
        if (this.hasObjectChanges(formValue.medical_info, this.user.medical_info)) {
            changes.medical_info = formValue.medical_info;
        }

        return changes;
    }

    private hasObjectChanges(formObj: any, userObj: any): boolean {
        if (!userObj) return Object.values(formObj).some(value => value);
        
        return Object.keys(formObj).some(key => {
            const formValue = formObj[key];
            const userValue = userObj[key];
            return formValue !== userValue && (formValue || userValue);
        });
    }

    ngOnInit() {
        // Get current user data
        this.userService.getCurrentUser().subscribe({
            next: (user) => {
                this.user = user;
                if (user) {
                    // Update form with current user data
                    this.profileForm.patchValue({
                        email: user.email,
                        username: user.username,
                        first_name: user.first_name || '',
                        last_name: user.last_name || '',
                        date_of_birth: user.date_of_birth ? new Date(user.date_of_birth) : null,
                        phone: user.phone || '',
                        bio: user.bio || '',
                        climbing_level: user.climbing_level || '',
                        avatar: user.avatar || '',
                        emergency_contact: {
                            name: user.emergency_contact?.name || '',
                            phone: user.emergency_contact?.phone || '',
                            relationship: user.emergency_contact?.relationship || ''
                        },
                        medical_info: {
                            conditions: user.medical_info?.conditions || '',
                            allergies: user.medical_info?.allergies || '',
                            medications: user.medical_info?.medications || '',
                            blood_type: user.medical_info?.blood_type || ''
                        }
                    });
                }
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load user profile'
                });
            }
        });
    }

    onSubmit() {
        this.submitted = true;
        this.clearBackendErrors();

        if (this.profileForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Validation Error',
                detail: 'Please check all required fields and correct any errors'
            });
            return;
        }

        this.loading = true;
        const formValue = this.profileForm.getRawValue();
        const changedValues = this.getChangedValues(formValue);

        if (Object.keys(changedValues).length === 0) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'No changes to save'
            });
            this.loading = false;
            this.cancelEdit.emit();
            return;
        }

        this.userService.updateProfile(changedValues).subscribe({
            next: (updatedUser) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Profile updated successfully'
                });
                this.authService.updateStoredUser(updatedUser);
                this.profileUpdated.emit();
            },
            error: (error) => {
                this.loading = false;
                if (error.error && 'field_errors' in error.error) {
                    const validationError = error.error as ValidationError;
                    this.handleValidationErrors(validationError);
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message || 'Failed to update profile'
                    });
                }
            }
        });
    }

    private backendErrors: { [key: string]: string[] } = {};

    private clearBackendErrors(): void {
        this.backendErrors = {};
    }

    private handleValidationErrors(error: ValidationError): void {
        this.backendErrors = error.field_errors;
        this.messageService.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: error.message
        });

        // Mark fields with backend errors as touched
        Object.keys(error.field_errors).forEach(fieldName => {
            const control = this.profileForm.get(fieldName);
            if (control) {
                control.markAsTouched();
            }
        });
    }

    // Add public navigation method
    onCancel(): void {
        this.cancelEdit.emit();
    }
} 