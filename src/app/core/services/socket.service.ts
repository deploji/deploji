import { EventEmitter, Injectable } from '@angular/core';
import { StatusMessage } from '../interfaces/status-message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: WebSocket;
  private jobStatusEmitter: EventEmitter<StatusMessage> = new EventEmitter();

  public constructor() {
    // this.socket = new WebSocket('ws://localhost:8080/ws');
    // this.socket.onopen = () => {
    //   console.log('Websocket connection established');
    // };
    // this.socket.onclose = () => {
    //   console.log('Websocket connection closed');
    // };
    // this.socket.onmessage = event => {
    //   const data = JSON.parse(event.data);
    //   switch (data.Type) {
    //     case 'StatusMessage':
    //       this.jobStatusEmitter.emit(data);
    //   }
    // };
  }

  public send(data: string) {
    this.socket.send(data);
  }

  public close() {
    this.socket.close();
  }

  public getJobStatusQueue() {
    return this.jobStatusEmitter;
  }
}
