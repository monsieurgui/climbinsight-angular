export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/users/login',
        REGISTER: '/users/register',
        REFRESH_TOKEN: '/users/token/refresh',
        VERIFY_EMAIL: '/users/verify-email',
        FORGOT_PASSWORD: '/users/password/reset',
        FORGOT_PASSWORD_CONFIRM: '/users/password/reset/confirm',
        PASSWORD: {
            RESET: '/users/password/reset',
            RESET_CONFIRM: '/users/password/reset/confirm'
        },
        REGISTRATION_STATUS: '/users/registration-status'
    },
    USER: {
        ME: '/users/me',
        PROFILE: '/users/profile',
        PROFILE_BY_ID: (id: number) => `/users/profile/${id}`,
        ROLE: (id: number) => `/users/role/${id}`,
        SESSIONS: {
            LIST: '/users/sessions',
            REVOKE: '/users/sessions/revoke'
        }
    }
}; 