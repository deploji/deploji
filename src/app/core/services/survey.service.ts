import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../interfaces/survey';
import { SurveyInput } from '../interfaces/survey-input';

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
    return this.api.put<Survey>(`/api/templates/${id}/survey`, payload);
  }

  public deleteSurvey(id: number): void {
    this.api.delete(`/api/templates/${id}/survey`).subscribe();
  }

  public getSurveyInputs(id: number): Observable<SurveyInput[]> {
    return this.api.get<SurveyInput[]>(`/api/templates/${id}/survey/inputs`);
  }

  public createSurveyInput(id: number, payload: SurveyInput): Observable<SurveyInput> {
    return this.api.post<SurveyInput>(`/api/templates/${id}/survey/inputs`, payload);
  }

  public updateSurveyInput(id: number, payload: SurveyInput) {
    return this.api.put<SurveyInput>(`/api/templates/${id}/survey/inputs`, payload);
  }

  public deleteSurveyInput(id: number): void {
    this.api.delete(`/api/templates/${id}/survey/inputs`).subscribe();
  }
}
