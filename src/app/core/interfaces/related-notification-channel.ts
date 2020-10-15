import { NotificationChannel } from './notification-channel';

export interface RelatedNotificationChannel {
  NotificationChannel?: NotificationChannel;
  NotificationChannelID: number;
  StartEnabled: boolean;
  SuccessEnabled: boolean;
  FailEnabled: boolean;
}
