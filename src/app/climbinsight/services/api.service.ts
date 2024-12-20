import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api.interface';

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
            params
        });
    }

    post<T>(path: string, body: any = {}): Observable<T> {
        const processedBody = body instanceof FormData ? body : JSON.stringify(body);
        
        const headers = body instanceof FormData ? 
            new HttpHeaders({ 'Accept': 'application/json' }) : 
            this.createHeaders();

        return this.http.post<T>(
            `${environment.apiUrl}${path}`, 
            processedBody,
            { headers }
        );
    }

    put<T>(path: string, body: any = {}): Observable<T> {
        const processedBody = body instanceof FormData ? body : JSON.stringify(body);
        
        const headers = body instanceof FormData ? 
            new HttpHeaders({ 'Accept': 'application/json' }) : 
            this.createHeaders();

        return this.http.put<T>(
            `${environment.apiUrl}${path}`, 
            processedBody,
            { headers }
        );
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${environment.apiUrl}${path}`, {
            headers: this.createHeaders()
        });
    }

    // For file uploads
    upload<T>(path: string, file: File): Observable<T> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<T>(`${environment.apiUrl}${path}`, formData);
    }
} 