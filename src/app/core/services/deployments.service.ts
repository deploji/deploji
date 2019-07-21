import { Injectable } from '@angular/core';
import { Deployment } from '../interfaces/deployment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeploymentsService {

  constructor(private http: HttpClient) {
  }

  save(deployment: Deployment): Observable<Deployment> {
    return this.http.post<Deployment>('/api/deployments', deployment);
  }

  getDeployment(id: number): Observable<Deployment> {
    return this.http.get<Deployment>(`/api/deployments/${id}`);
  }

  getDeployments(): Observable<Deployment[]> {
    return this.http.get<Deployment[]>('/api/deployments');
  }
}
