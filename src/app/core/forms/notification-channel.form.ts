import { FormControl, FormGroup } from '@angular/forms';
import {NotificationChannelTypesEnum} from '../enums/notification-channel-types.enum';

export class NotificationChannel extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl(),
      Type: new FormControl(),
      Recipients: new FormControl(),
      Webhook: new FormControl()
    });
  }

  get ID() {
    return this.get('ID') as FormControl;
  }

  get Name() {
    return this.get('Name') as FormControl;
  }

  get Type() {
    return this.get('Type') as FormControl;
  }

  get Recipients() {
    return this.get('Recipients') as FormControl;
  }

  get Webhook() {
    return this.get('Webhook') as FormControl;
  }

  get isEmail() {
    return this.Type.value === NotificationChannelTypesEnum.EMAIL;
  }

  get isWebhook() {
    return this.Type.value === NotificationChannelTypesEnum.WEBHOOK;
  }
}
