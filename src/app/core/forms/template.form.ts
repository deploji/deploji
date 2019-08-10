import { FormControl, FormGroup } from '@angular/forms';

export class TemplateForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl(),
      Project: new FormControl(),
      Inventory: new FormControl(),
      Playbook: new FormControl(),
      SshKey: new FormControl(),
    });
  }
}
