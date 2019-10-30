import { FormControl, FormGroup } from '@angular/forms';

export class DeploymentFiltersForm extends FormGroup {
  constructor() {
    super({
      application_id: new FormControl(),
      inventory_id: new FormControl()
    });
  }

  get application_id(): FormControl {
    return this.get('application_id') as FormControl;
  }

  get inventory_id(): FormControl {
    return this.get('inventory_id') as FormControl;
  }
}
