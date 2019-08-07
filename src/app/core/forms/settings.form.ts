import { FormArray, FormGroup } from '@angular/forms';
import { SettingForm } from './setting.form';
import { SettingGroup } from '../interfaces/settingGroup';

export class SettingsForm extends FormGroup {
  constructor(settings: SettingGroup[]) {
    super({
      Groups: new FormArray([])
    });
    settings.forEach(group => {
      const array = new FormArray([]);
      this.Groups.push(array);
      group.Settings.forEach(setting => {
        const settingForm = new SettingForm();
        settingForm.patchValue(setting);
        array.push(settingForm);
      });
    });
  }

  get Groups() {
    return this.get('Groups') as FormArray;
  }
}
