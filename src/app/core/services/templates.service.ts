import { Injectable } from '@angular/core';
import { Template } from '../interfaces/template';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  constructor(private http: HttpClient) {
  }

  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>('/api/templates');
  }

  create(template: Template): Observable<Template> {
    return this.http.post<Template>('/api/templates', template);
  }

  destroy(template: Template): Observable<void> {
    return this.http.delete<void>(`/api/templates/${template.ID}`);
  }

  getTemplate(id: number): Observable<Template> {
    return this.http.get<Template>(`/api/templates/${id}`);
  }

  save(template: Template): Observable<Template> {
    if (template.ID) {
      return this.http.put<Template>(`/api/templates/${template.ID}`, template);
    }
    return this.http.post<Template>('/api/templates', template);
  }
}
