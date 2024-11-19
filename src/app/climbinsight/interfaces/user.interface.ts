export interface User {
    id?: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    is_active?: boolean;
    date_of_birth?: Date;
    phone_number?: string;
    avatar?: string;
    google_id?: string;
    facebook_id?: string;
    climbing_level?: string;
    primary_login_method: 'email' | 'google' | 'facebook';
    role?: {
        id: number;
        name: string;
        description?: string;
    };
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: User;
} 