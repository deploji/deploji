import { FormControl, FormGroup } from '@angular/forms';

export class SettingForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Value: new FormControl(),
      BoolValue: new FormControl()
    });
  }
}
