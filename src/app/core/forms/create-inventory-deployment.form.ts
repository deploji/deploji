import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Inventory } from '../interfaces/inventory';
import { JobTypesEnum } from '../enums/job-types.enum';
import { Job } from '../interfaces/job';

export class CreateInventoryDeploymentForm extends FormGroup {
  constructor() {
    super({
      Inventory: new FormControl(),
      Applications: new FormArray([]),
    });
    this.Inventory.valueChanges.subscribe((selectedInventory: Inventory) => {
      this.Applications.clear();
      selectedInventory.ApplicationInventories.forEach(inventory => {
        this.Applications.push(
          new FormGroup({
            IsActive: new FormControl(true),
            Application: new FormControl(inventory.Application),
            Version: new FormControl(),
            Playbook: new FormControl(inventory.Playbook),
            ExtraVariables: new FormControl(inventory.ExtraVariables),
            KeyID: new FormControl(inventory.KeyID)
          })
        );
      });
    });
  }

  get Inventory() {
    return this.get('Inventory') as FormGroup;
  }

  get Applications() {
    return this.get('Applications') as FormArray;
  }

  get deploymentsValue(): Job[] {
    return this.value.Applications
      .filter(application => application.IsActive)
      .map(value => ({
        Type: JobTypesEnum.DEPLOYMENT,
        ApplicationID: value.Application.ID,
        Version: value.Version,
        InventoryID: this.value.Inventory.ID,
        KeyID: value.KeyID,
        ExtraVariables: value.ExtraVariables,
        Playbook: value.Playbook ? value.Playbook : value.Application.AnsiblePlaybook
      }));
  }
}
