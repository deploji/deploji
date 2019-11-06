import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../interfaces/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private api: HttpClient
  ) {}

  public getSurvey(id: number): Observable<Survey> {
    return this.api.get<Survey>(`/api/templates/${id}/survey`);
  }

  public createSurvey(id: number, payload: Survey): Observable<any> {
    return this.api.post<Survey>(`/api/templates/${id}/survey`, payload);
  }

  public updateSurvey(id: number, payload: Survey): Observable<any> {
    return this.api.post<Survey>(`/api/templates/${id}/survey`, payload);
  }

  public deleteSurvey(id: number): void {
    this.api.delete(`/api/templates/${id}/survey`);
  }
}
