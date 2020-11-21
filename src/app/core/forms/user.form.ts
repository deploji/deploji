import { FormControl, FormGroup, Validators } from '@angular/forms';

export class UserForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Username: new FormControl('', [Validators.required]),
      Type: new FormControl(),
      Name: new FormControl(),
      Surname: new FormControl(),
      Email: new FormControl(),
      Password: new FormControl(),
      IsActive: new FormControl(),
    });
  }

  get Username(): FormControl {
    return this.get('Username') as FormControl;
  }
}
