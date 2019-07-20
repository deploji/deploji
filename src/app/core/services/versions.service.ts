import {Injectable} from '@angular/core';
import {App} from '../interfaces/app';
import {Observable} from 'rxjs';
import {Version} from '../interfaces/version';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VersionsService {

  constructor(private http: HttpClient) { }

  getVersions(app: App): Observable<Version[]> {
    return this.http.get<Version[]>('/api/versions', {params: {app: app.ID.toString()}});
  }
}
