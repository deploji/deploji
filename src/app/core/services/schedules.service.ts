import { Injectable } from '@angular/core';
import { Schedule } from '../interfaces/schedule';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  constructor(private http: HttpClient) {
  }

  save(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>('/api/schedules', schedule);
  }

  getOne(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`/api/schedules/${id}`);
  }

  getAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>('/api/schedules');
  }
}
