import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Inventory } from '../interfaces/inventory';
import { JobTypesEnum } from '../enums/job-types.enum';
import { Job } from '../interfaces/job';
import { notEmpty } from '../utils/utils';
import { DeploymentApplicationForm } from './deployment-application.form';

export class CreateInventoryDeploymentForm extends FormGroup {
  constructor() {
    super({
      Inventory: new FormControl(),
      Applications: new FormArray([]),
    });
    this.Inventory.valueChanges.subscribe((selectedInventory: Inventory) => {
      this.ApplicationsArray.clear();
      selectedInventory.ApplicationInventories.forEach(inventory => this.ApplicationsArray.push(new DeploymentApplicationForm(inventory)));
    });
  }

  get Inventory() {
    return this.get('Inventory') as FormControl;
  }

  get ApplicationsArray() {
    return this.get('Applications') as FormArray;
  }

  get Applications() {
    return this.ApplicationsArray.controls as DeploymentApplicationForm[];
  }

  get deploymentsValue(): Job[] {
    return this.value.Applications
      .filter(application => application.IsActive)
      .map(value => ({
        Type: JobTypesEnum.DEPLOYMENT,
        ApplicationID: value.Application.ID,
        Version: value.Version.Value,
        InventoryID: this.value.Inventory.ID,
        KeyID: value.KeyID,
        ExtraVariables: value.ExtraVariables,
        Playbook: notEmpty(value.Playbook) ? value.Playbook : value.Application.AnsiblePlaybook
      }));
  }
}
