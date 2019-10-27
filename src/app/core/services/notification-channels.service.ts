import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationChannel } from '../interfaces/notification-channel';
import { TemplateNotificationChannel } from '../interfaces/template-notification-channel';
import { ApplicationNotificationChannel } from '../interfaces/application-notification-channel';
import {ProjectNotificationChannel} from '../interfaces/project-notification-channel';

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

  getApplicationNotificationChannels(id: number): Observable<any> {
    return this.api.get(`/api/applications/${id}/notifications`);
  }

  getProjectNotificationChannels(id: number): Observable<any> {
    return this.api.get(`/api/projects/${id}/notifications`);
  }

  getTemplateNotificationChannels(id: number): Observable<any> {
    return this.api.get(`/api/templates/${id}/notifications`);
  }

  assignChannelToApplication(payload: ApplicationNotificationChannel): Observable<any> {
    return this.api.put(`/api/applications/${payload.ApplicationID}/notifications`, payload);
  }

  assignChannelToProject(payload: ProjectNotificationChannel): Observable<any> {
    return this.api.put(`/api/projects/${payload.ProjectID}/notifications`, payload);
  }

  assignChannelToTemplate(payload: TemplateNotificationChannel): Observable<any> {
    return this.api.put(`/api/templates/${payload.TemplateID}/notifications`, payload);
  }
}
