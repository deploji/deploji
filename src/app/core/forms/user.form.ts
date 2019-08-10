import { FormControl, FormGroup, Validators } from '@angular/forms';

export class UserForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Username: new FormControl('', [Validators.required]),
      Name: new FormControl(),
      Surname: new FormControl(),
      Email: new FormControl(),
      Password: new FormControl(),
      IsActive: new FormControl(),
    });
  }
}
