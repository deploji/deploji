import { FormControl, FormGroup } from '@angular/forms';

export class DeploymentFiltersForm extends FormGroup {
  constructor() {
    super({
      application_id: new FormControl(),
      user_id: new FormControl(),
      inventory_id: new FormControl()
    });
  }

  get applicationId(): FormControl {
    return this.get('application_id') as FormControl;
  }

  get inventoryId(): FormControl {
    return this.get('inventory_id') as FormControl;
  }

  get userId(): FormControl {
    return this.get('user_id') as FormControl;
  }
}
