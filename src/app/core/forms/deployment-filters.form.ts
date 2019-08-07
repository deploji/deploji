import { FormControl, FormGroup } from '@angular/forms';

export class DeploymentFiltersForm extends FormGroup {
  constructor() {
    super({
      application_id: new FormControl(),
      inventory_id: new FormControl()
    });
  }
}
