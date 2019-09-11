import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/auth/users');
  }

  destroy(id: number) {
    return this.http.delete(`/api/auth/users/${id}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/auth/users/${id}`);
  }

  save(user: User): Observable<User> {
    if (user.ID) {
      return this.http.put<User>('/api/auth/users', user);
    }
    return this.http.post<User>('/api/auth/users', user);
  }
}
