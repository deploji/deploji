import { FormControl, FormGroup } from '@angular/forms';

export class InventoryForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl(),
      Project: new FormControl(),
      SourceFile: new FormControl(),
    });
  }

  get ID() {
    return this.get('ID') as FormControl;
  }

  get Name() {
    return this.get('Name') as FormControl;
  }

  get Project() {
    return this.get('Project') as FormControl;
  }

  get SourceFile() {
    return this.get('SourceFile') as FormControl;
  }
}
