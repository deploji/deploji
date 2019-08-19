import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';
import { ProjectFile } from '../interfaces/project-file';
import { Job } from '../interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects');
  }

  destroy(project: Project) {
    return this.http.delete(`/api/projects/${project.ID}`);
  }

  save(project: Project): Observable<Project> {
    if (project.ID) {
      return this.http.put<Project>('/api/projects', project);
    }
    return this.http.post<Project>('/api/projects', project);
  }

  synchronize(project: Project): Observable<Job> {
    return this.http.post<Job>(`/api/projects/${project.ID}/synchronize`, {});
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`/api/projects/${id}`);
  }

  getProjectFiles(project: Project): Observable<ProjectFile[]> {
    return this.http.get<ProjectFile[]>(`/api/projects/${project.ID}/files`);
  }

  getProjectSyncStatus(): Observable<Job[]> {
    return this.http.get<Job[]>(`/api/projects/synchronize-status`);
  }
}
