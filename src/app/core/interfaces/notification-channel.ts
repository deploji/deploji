import {NotificationChannelTypesEnum} from '../enums/notification-channel-types.enum';

export interface NotificationChannel {
  ID?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string;
  Name?: string;
  Description?: string;
  Type?: NotificationChannelTypesEnum;
  Recipients?: string;
  WebhookURL?: string;
}
