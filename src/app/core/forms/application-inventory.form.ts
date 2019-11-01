import { FormControl, FormGroup } from '@angular/forms';

export class ApplicationInventoryForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl(),
      Inventory: new FormControl(),
      IsActive: new FormControl(true),
      Application: new FormControl(),
      ApplicationID: new FormControl(),
      ApplicationUrls: new FormControl(),
      ExtraVariables: new FormControl('---\n'),
      Key: new FormControl(),
      Playbook: new FormControl()
    });
  }

  get Inventory() {
    return this.get('Inventory') as FormControl;
  }

  get Key() {
    return this.get('Key') as FormControl;
  }

  get IsActive() {
    return this.get('IsActive') as FormControl;
  }

  get Application() {
    return this.get('Application') as FormControl;
  }

  get ApplicationID() {
    return this.get('ApplicationID') as FormControl;
  }

  get ApplicationUrls() {
    return this.get('ApplicationUrls') as FormControl;
  }
}
