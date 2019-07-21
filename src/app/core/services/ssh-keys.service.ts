import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SshKey } from '../interfaces/ssh-key';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SshKeysService {
  constructor(private http: HttpClient) {
  }

  getKeys(): Observable<SshKey[]> {
    return this.http.get<SshKey[]>('/api/ssh-keys');
  }

  create(value: SshKey): Observable<SshKey> {
    return this.http.post<SshKey>('/api/ssh-keys', value);
  }

  destroy(key: SshKey): Observable<void> {
    return this.http.delete<void>(`/api/ssh-keys/${key.ID}`);
  }
}
