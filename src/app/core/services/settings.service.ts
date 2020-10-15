import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setting } from '../interfaces/setting';
import { SettingGroup } from '../interfaces/setting-group';
import { VapidKeys } from '../interfaces/vapid-keys';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {
  }

  save(settings: Setting[]): Observable<Setting> {
    return this.http.put<Setting>('/api/settings', settings);
  }

  getSettings(): Observable<SettingGroup[]> {
    return this.http.get<SettingGroup[]>('/api/settings');
  }

  generateVapidKeys() {
    return this.http.get<VapidKeys>('/api/settings/generate-vapid-keys');
  }
}
