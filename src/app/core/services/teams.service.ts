import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>('/api/teams');
  }

  destroy(id: number) {
    return this.http.delete(`/api/teams/${id}`);
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`/api/teams/${id}`);
  }

  save(team: Team): Observable<Team> {
    if (team.ID) {
      return this.http.put<Team>('/api/teams', team);
    }
    return this.http.post<Team>('/api/teams', team);
  }
}
