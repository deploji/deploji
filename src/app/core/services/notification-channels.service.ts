import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationChannel } from '../interfaces/notification-channel';

@Injectable({
  providedIn: 'root'
})
export class NotificationChannelsService {

  constructor(
    private api: HttpClient
  ) { }

  getNotificationChannels(): Observable<any> {
    return this.api.get('/api/notification-channels');
  }

  getNotificationChannel(id: number): Observable<any> {
    return this.api.get(`/api/notification-channels/${id}`);
  }

  deleteNotificationChannel(id: number): Observable<any> {
    return this.api.delete(`/api/notification-channels/${id}`);
  }

  createNotificationChannel(channel: NotificationChannel): Observable<any> {
    return this.api.post('/api/notification-channels', channel);
  }

  updateNotificationChannel(id: number, channel: NotificationChannel): Observable<any> {
    return this.api.put(`/api/notification-channels/${id}`, channel);
  }
}
