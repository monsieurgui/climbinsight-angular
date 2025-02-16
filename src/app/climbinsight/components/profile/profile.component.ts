import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: User | null = null;
    loading = true;
    editMode = false;

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.loadUserProfile();
    }

    loadUserProfile() {
        this.loading = true;
        this.userService.getCurrentUser().subscribe({
            next: (user) => {
                this.user = user;
                this.loading = false;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load profile'
                });
                this.loading = false;
            }
        });
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
    }

    onProfileUpdate() {
        this.loadUserProfile();
        this.editMode = false;
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Profile updated successfully'
        });
    }
} 