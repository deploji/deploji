import { Injectable } from '@angular/core';
import { Job } from '../interfaces/job';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobLog } from '../interfaces/job-log';
import { Page } from '../interfaces/page';
import { Collection } from '../utils/collection';
import { map } from 'rxjs/operators';
import { HttpParamsBuilder } from '../utils/http-params-builder';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private http: HttpClient) {
  }

  save(job: Job): Observable<Job> {
    return this.http.post<Job>('/api/jobs', job);
  }

  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`/api/jobs/${id}`);
  }

  getJobLogs(id: number): Observable<JobLog[]> {
    return this.http.get<JobLog[]>(`/api/jobs/${id}/logs`);
  }

  getJobs(filters: any = { }, page: Page = { page: 0, limit: 10, orderBy: 'id desc'}): Observable<Collection<Job>> {
    return this.http.get<Job[]>('/api/jobs', {
      observe: 'response',
      params: new HttpParamsBuilder().page(page).filters(filters).build()
    }).pipe(
      map(value => new Collection<Job>(value))
    );
  }

  getLatestDeployments() {
    return this.http.get<Job[]>('/api/jobs/latest-deployments');
  }

  relaunch(job: Job): Observable<Job> {
    const newJob = _.cloneDeep(job);
    delete newJob.ID;
    delete newJob.CreatedAt;
    delete newJob.StartedAt;
    delete newJob.FinishedAt;
    delete newJob.Status;
    return this.save(newJob);
  }
}
