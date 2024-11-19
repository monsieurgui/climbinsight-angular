import { User } from './user.interface';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    phone_number?: string;
}

export interface PasswordResetRequest {
    email: string;
}

export interface PasswordResetConfirmRequest {
    token: string;
    new_password: string;
}

export interface EmailVerificationRequest {
    token: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: User;
    token_type: string;
}

export interface TokenRefreshRequest {
    refresh_token: string;
}

export interface TokenRefreshResponse {
    access_token: string;
    token_type: string;
} 