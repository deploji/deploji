import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationChannel } from '../interfaces/notification-channel';
import { TemplateNotificationChannel } from '../interfaces/template-notification-channel';
import { ApplicationNotificationChannel } from '../interfaces/application-notification-channel';
import { ProjectNotificationChannel } from '../interfaces/project-notification-channel';

@Injectable({
  providedIn: 'root'
})
export class NotificationChannelsService {

  constructor(
    private api: HttpClient
  ) { }

  getNotificationChannels(): Observable<NotificationChannel[]> {
    return this.api.get<NotificationChannel[]>('/api/notification-channels');
  }

  getNotificationChannel(id: number): Observable<NotificationChannel> {
    return this.api.get<NotificationChannel>(`/api/notification-channels/${id}`);
  }

  deleteNotificationChannel(id: number): Observable<null> {
    return this.api.delete<null>(`/api/notification-channels/${id}`);
  }

  createNotificationChannel(channel: NotificationChannel): Observable<NotificationChannel> {
    return this.api.post('/api/notification-channels', channel);
  }

  updateNotificationChannel(id: number, channel: NotificationChannel): Observable<NotificationChannel> {
    return this.api.put(`/api/notification-channels/${id}`, channel);
  }

  getApplicationNotificationChannels(id: number): Observable<ApplicationNotificationChannel[]> {
    return this.api.get<ApplicationNotificationChannel[]>(`/api/applications/${id}/notifications`);
  }

  getProjectNotificationChannels(id: number): Observable<ProjectNotificationChannel[]> {
    return this.api.get<ProjectNotificationChannel[]>(`/api/projects/${id}/notifications`);
  }

  getTemplateNotificationChannels(id: number): Observable<TemplateNotificationChannel[]> {
    return this.api.get<TemplateNotificationChannel[]>(`/api/templates/${id}/notifications`);
  }

  assignChannelToApplication(payload: ApplicationNotificationChannel): Observable<ApplicationNotificationChannel[]> {
    return this.api.put<ApplicationNotificationChannel[]>(`/api/applications/${payload.ApplicationID}/notifications`, payload);
  }

  assignChannelToProject(payload: ProjectNotificationChannel): Observable<ProjectNotificationChannel[]> {
    return this.api.put<ProjectNotificationChannel[]>(`/api/projects/${payload.ProjectID}/notifications`, payload);
  }

  assignChannelToTemplate(payload: TemplateNotificationChannel): Observable<TemplateNotificationChannel[]> {
    return this.api.put<TemplateNotificationChannel[]>(`/api/templates/${payload.TemplateID}/notifications`, payload);
  }
}
