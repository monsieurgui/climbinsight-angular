import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api.interface';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.get<T>(`${environment.apiUrl}${path}`, {
            headers: this.createHeaders(),
            params,
            withCredentials: true
        });
    }

    post<T>(path: string, body: any = {}): Observable<T> {
        console.log('API Service making POST request to:', path, 'with body:', body);
        
        const headers = body instanceof FormData ? 
            new HttpHeaders({ 'Accept': 'application/json' }) : 
            this.createHeaders();

        return this.http.post<T>(
            `${environment.apiUrl}${path}`, 
            body,
            { headers, withCredentials: true }
        ).pipe(
            tap({
                next: (response) => console.log('API Service success response:', response),
                error: (error) => console.error('API Service error response:', error)
            })
        );
    }

    put<T>(path: string, body: any = {}): Observable<T> {
        const headers = body instanceof FormData ? 
            new HttpHeaders({ 'Accept': 'application/json' }) : 
            this.createHeaders();

        return this.http.put<T>(
            `${environment.apiUrl}${path}`, 
            body,
            { headers, withCredentials: true }
        );
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${environment.apiUrl}${path}`, {
            headers: this.createHeaders(),
            withCredentials: true
        });
    }

    // For file uploads
    upload<T>(path: string, file: File): Observable<T> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<T>(
            `${environment.apiUrl}${path}`, 
            formData,
            { withCredentials: true }
        );
    }
} 