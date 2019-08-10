import { FormControl, FormGroup, Validators } from '@angular/forms';

export class RepositoryForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl([]),
      Name: new FormControl('', [Validators.required]),
      Url: new FormControl('', [Validators.required, Validators.pattern(/http(s)?:\/\/.*/)]),
      Type: new FormControl('', [Validators.required]),
      Username: new FormControl(),
      Password: new FormControl(),
    });
  }
}
