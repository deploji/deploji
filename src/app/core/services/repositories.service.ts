import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from '../interfaces/repository';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  constructor(private http: HttpClient) {
  }

  getRepository(id: number): Observable<Repository> {
    return this.http.get<Repository>(`/api/repositories/${id}`);
  }

  save(repository: Repository): Observable<Repository> {
    if (repository.ID) {
      return this.http.put<Repository>(`/api/repositories/${repository.ID}`, repository);
    }
    return this.http.post<Repository>('/api/repositories', repository);
  }

  getRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>('/api/repositories');
  }

  destroy(repository: Repository) {
    return this.http.delete(`/api/repositories/${repository.ID}`);
  }
}
