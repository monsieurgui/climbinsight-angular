import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from '../interfaces/league.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private apiUrl = `${environment.apiUrl}/leagues/`;

  constructor(private http: HttpClient) {}

  getLeagues(params?: {
    search?: string;
    active_only?: boolean;
    category?: string;
  }): Observable<League[]> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.active_only) httpParams = httpParams.set('active_only', params.active_only.toString());
    if (params?.category) httpParams = httpParams.set('category', params.category);

    return this.http.get<League[]>(this.apiUrl, { params: httpParams });
  }

  getLeague(id: number): Observable<League> {
    return this.http.get<League>(`${this.apiUrl}${id}`);
  }

  createLeague(leagueData: Partial<League>): Observable<League> {
    const payload = {
        name: leagueData.name,
        description: leagueData.description,
        start_date: leagueData.start_date?.toISOString().split('T')[0],
        end_date: leagueData.end_date?.toISOString().split('T')[0],
        categories: leagueData.categories,
        status: leagueData.status,
        is_active: leagueData.is_active ?? true
    };

    console.log('Creating league with payload:', payload);
    return this.http.post<League>(this.apiUrl, payload);
  }

  updateLeague(id: number, leagueData: Partial<League>): Observable<League> {
    const payload = {
        name: leagueData.name,
        description: leagueData.description,
        start_date: leagueData.start_date?.toISOString().split('T')[0],
        end_date: leagueData.end_date?.toISOString().split('T')[0],
        categories: leagueData.categories,
        status: leagueData.status,
        is_active: leagueData.is_active ?? true
    };

    return this.http.put<League>(`${this.apiUrl}${id}`, payload);
  }

  deleteLeague(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  getLeagueCompetitions(leagueId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${leagueId}/competitions/`);
  }

  getLeagueSummary(leagueId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${leagueId}/summary/`);
  }

  getLeagueAthletes(leagueId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${leagueId}/athletes/`);
  }

  addAthleteToLeague(leagueId: number, athleteId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${leagueId}/athletes/${athleteId}/`, {});
  }

  removeAthleteFromLeague(leagueId: number, athleteId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${leagueId}/athletes/${athleteId}/`);
  }

  getLeagueOfficials(leagueId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${leagueId}/officials/`);
  }

  getLeagueRankings(leagueId: number, category?: string): Observable<any> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    return this.http.get<any>(`${this.apiUrl}${leagueId}/rankings/`, { params });
  }

  updateLeagueRankings(leagueId: number, rankings: any, category?: string): Observable<any> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    return this.http.post<any>(`${this.apiUrl}${leagueId}/rankings/`, rankings, { params });
  }
} 