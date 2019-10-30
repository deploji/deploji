import { NotificationChannel } from './notification-channel';

export interface RelatedNotificationChannel {
  NotificationChannel?: NotificationChannel;
  NotificationChannelID: number;
  SuccessEnabled: boolean;
  FailEnabled: boolean;
}
