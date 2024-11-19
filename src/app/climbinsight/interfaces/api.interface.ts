export interface ApiResponse<T> {
    status: 'success' | 'error';
    message?: string;
    data?: T;
    errors?: any;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface ErrorResponse {
    status: 'error';
    message: string;
    errors?: {
        [key: string]: string[];
    };
} 