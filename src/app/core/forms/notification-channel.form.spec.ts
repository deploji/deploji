import { NotificationChannel } from './notification-channel.form';
import { NotificationChannelTypesEnum } from '../enums/notification-channel-types.enum';

describe('NotificationChannel.Form', () => {
  it('should create an instance', () => {
    expect(new NotificationChannel()).toBeTruthy();
  });

  it('should be invalid', () => {
    const form = new NotificationChannel();
    expect(form.valid).toBeFalse();
  });

  it('should be valid', () => {
    const form = new NotificationChannel();
    form.Name.setValue('team communication channel');
    expect(form.valid).toBeTrue();
  });

  it('should check if the type is email', () => {
    const form = new NotificationChannel();
    form.Type.setValue(NotificationChannelTypesEnum.EMAIL);

    expect(form.isEmail).toBeTrue();
  });

  it('should check if the type is webhook', () => {
    const form = new NotificationChannel();
    form.Type.setValue(NotificationChannelTypesEnum.WEBHOOK);

    expect(form.isWebhook).toBeTrue();
  });
});
