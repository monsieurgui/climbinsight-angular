export interface User {
    id: number;
    email: string;
    email_verified: boolean;
    username: string;
    first_name: string | null;
    last_name: string | null;
    date_of_birth: string | null;
    phone: string | null;
    roles: string[];
    emergency_contact: {
        name?: string;
        phone?: string;
        relationship?: string;
    } | null;
    medical_info: any | null;
    certifications: any[] | null;
    bio: string;
    profile_picture: string;
    preferences: Record<string, any>;
    notification_settings: Record<string, any>;
    avatar: string | null;
    google_id?: string;
    facebook_id?: string;
    climbing_level: string | null;
    primary_login_method: 'email' | 'google' | 'facebook';
    role?: {
        name: string;
        permissions: string[];
    };
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    date_joined: string;
}

export interface ProfileUpdateRequest {
    first_name?: string | null;
    last_name?: string | null;
    date_of_birth?: string | null;
    phone?: string | null;
    bio?: string | null;
    climbing_level?: string | null;
    avatar?: string | null;
    emergency_contact?: {
        name?: string;
        phone?: string;
        relationship?: string;
    } | null;
    medical_info?: any | null;
}

export interface UserLeagueResponse {
    leagues_as_athlete: any[];
    leagues_as_official: any[];
    total_competitions: number;
    current_rankings: Record<string, any>;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: User;
} 