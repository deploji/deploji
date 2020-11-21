import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TeamForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl('', [Validators.required]),
    });
  }

  get Name(): FormControl {
    return this.get('Name') as FormControl;
  }
}
