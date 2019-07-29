import { Injectable } from '@angular/core';
import { Deployment } from '../interfaces/deployment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeploymentLog } from '../interfaces/deployment-log';
import { Page } from '../interfaces/page';
import { Collection } from '../utils/collection';
import { map } from 'rxjs/operators';
import { HttpParamsBuilder } from '../utils/http-params-builder';

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

  getDeploymentLogs(id: number): Observable<DeploymentLog[]> {
    return this.http.get<DeploymentLog[]>(`/api/deployments/${id}/logs`);
  }

  getDeployments(filters: any = {}, page: Page = {page: 0, limit: 10, orderBy: 'id desc'}): Observable<Collection<Deployment>> {
    return this.http.get<Deployment[]>('/api/deployments', {
      observe: 'response',
      params: new HttpParamsBuilder().page(page).filters(filters).build()
    }).pipe(
      map(value => new Collection<Deployment>(value))
    );
  }

  getLatestDeployments() {
    return this.http.get<Deployment[]>('/api/deployments/latest');
  }
}
