import { FormControl, FormGroup } from '@angular/forms';
import { Deployment } from '../interfaces/deployment';
import { JobTypesEnum } from '../enums/job-types.enum';

export class CreateDeploymentForm extends FormGroup {
  constructor() {
    super({
      Application: new FormControl(),
      Inventories: new FormControl(),
      Version: new FormControl(),
    });
  }

  get Application() {
    return this.get('Application') as FormControl;
  }

  get Inventories() {
    return this.get('Inventories') as FormControl;
  }

  get Version() {
    return this.get('Version') as FormControl;
  }

  get deploymentsValue(): Deployment[] {
    return this.value.Inventories
      .map(value => ({
        Type: JobTypesEnum.DEPLOYMENT,
        Application: this.value.Application,
        Version: this.value.Version,
        Inventory: value
      }));
  }
}
