import { FormControl, FormGroup, Validators } from '@angular/forms';

export class SurveyDetailsForm extends FormGroup {
  constructor() {
    super({
      Label: new FormControl({value: '', disabled: true}, Validators.required),
      Hint: new FormControl({value: '', disabled: true}, Validators.required),
      VariableName: new FormControl({value: '', disabled: true}, Validators.required),
      Type: new FormControl({value: '', disabled: true}, Validators.required)
    });
  }

  get Label(): FormControl  {
    return this.get('Label') as FormControl;
  }

  get Hint(): FormControl {
    return this.get('Hint') as FormControl;
  }

  get VariableName(): FormControl {
    return this.get('VariableName') as FormControl;
  }

  get Type(): FormControl {
    return this.get('Type') as FormControl;
  }
}
