import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { environment } from '../environments/environment';

export const myRxStompConfig: InjectableRxStompConfig = {
  // Which server?
  brokerURL: environment.production
    ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}:${window.location.port}/stomp/ws`
    : `ws://localhost/stomp/ws`,

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'guest',
    passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 0, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 500,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  // debug: (msg: string): void => {
  //   console.log(new Date(), msg);
  // }
};
