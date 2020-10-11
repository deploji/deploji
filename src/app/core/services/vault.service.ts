import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  constructor(private http: HttpClient) {
  }

  encrypt(keyId: number, name: string, content: string) {
    return this.http.post<any>(`/api/vault/encrypt`, {KeyID: keyId, Name: name, Content: content});
  }
}
