import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginForm extends FormGroup {
  constructor() {
    super({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    });
  }

  get Username() {
    return this.get('Username') as FormControl;
  }

  get Password() {
    return this.get('Password') as FormControl;
  }
}
