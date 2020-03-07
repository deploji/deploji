import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyInput } from '../interfaces/survey-input';

export class SurveyDetailsForm extends FormGroup {
  constructor() {
    super({
      Label: new FormControl({value: '', disabled: true}, Validators.required),
      Hint: new FormControl({value: '', disabled: true}, Validators.required),
      VariableName: new FormControl({value: '', disabled: true}, Validators.required),
      Type: new FormControl({value: '', disabled: true}, Validators.required),
      Options: new FormControl({value: '', disabled: true}, Validators.required)
    });
  }

  get new(): SurveyInput {
    return {
      VariableName: '',
      Label: '',
      Hint: '',
      Type: '',
      Options: ''
    };
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

  get Options(): FormControl {
    return this.get('Options') as FormControl;
  }
}
