import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private http: HttpClient) {
  }

  addPushSubscriber(sub: PushSubscription) {
    return this.http.post('/api/push-subscriptions', sub);
  }
}
