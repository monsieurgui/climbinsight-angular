import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private apiService: ApiService) { }

    getCurrentUser(): Observable<User> {
        return this.apiService.get<User>(API_ENDPOINTS.USER.ME);
    }

    getUserProfile(userId: number): Observable<User> {
        return this.apiService.get<User>(API_ENDPOINTS.USER.PROFILE_BY_ID(userId));
    }

    updateProfile(profileData: Partial<User>): Observable<User> {
        return this.apiService.put<User>(API_ENDPOINTS.USER.PROFILE, profileData);
    }

    assignRole(userId: number, roleId: number): Observable<User> {
        return this.apiService.post<User>(API_ENDPOINTS.USER.ROLE(userId), { role_id: roleId });
    }

    getSessions(): Observable<any[]> {
        return this.apiService.get<any[]>(API_ENDPOINTS.USER.SESSIONS.LIST);
    }

    revokeSession(sessionId: string): Observable<void> {
        return this.apiService.post<void>(API_ENDPOINTS.USER.SESSIONS.REVOKE, { session_id: sessionId });
    }
} 