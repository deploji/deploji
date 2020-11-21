import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class SurveyListForm extends FormGroup {

  constructor() {
    super({
      extraVariables: new FormArray([])
    });
  }

  public addControl(initialValue: string = '') {
    this.extraVariables.push(new FormControl(initialValue));
  }

  get extraVariables(): FormArray {
    return this.get('extraVariables') as FormArray;
  }
}
