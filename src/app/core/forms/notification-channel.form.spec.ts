import { NotificationChannel } from './notification-channel.form';
import { NotificationChannelTypesEnum } from '../enums/notification-channel-types.enum';

describe('NotificationChannel.Form', () => {
  it('should create an instance', () => {
    expect(new NotificationChannel()).toBeTruthy();
  });

  it('should be invalid', () => {
    const form = new NotificationChannel();
    expect(form.valid).toBeFalsy();
  });

  it('should be valid', () => {
    const form = new NotificationChannel();
    form.Name.setValue('team communication channel');
    expect(form.valid).toBeTruthy();
  });

  it('should check if the type is email', () => {
    const form = new NotificationChannel();
    form.Type.setValue(NotificationChannelTypesEnum.EMAIL);

    expect(form.isEmail).toBeTruthy();
  });

  it('should check if the type is webhook', () => {
    const form = new NotificationChannel();
    form.Type.setValue(NotificationChannelTypesEnum.WEBHOOK);

    expect(form.isWebhook).toBeTruthy();
  });
});
