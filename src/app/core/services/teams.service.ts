import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team';
import { User } from '../interfaces/user';

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
      return this.http.put<Team>(`/api/teams/${team.ID}`, team);
    }
    return this.http.post<Team>('/api/teams', team);
  }

  getTeamUsers(teamId: number) {
    return this.http.get<any[]>(`/api/teams/${teamId}/users`);
  }

  addUser(teamId: number, userId: number) {
    return this.http.post<User>(`/api/teams/${teamId}/users`, { ID: userId});
  }

  removeUser(teamId: number, userId: number) {
    return this.http.delete(`/api/teams/${teamId}/users/${userId}`);
  }
}
