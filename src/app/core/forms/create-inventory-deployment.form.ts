import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Inventory } from '../interfaces/inventory';
import { Deployment } from '../interfaces/deployment';
import { JobTypesEnum } from '../enums/job-types.enum';

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

  get deploymentsValue(): Deployment[] {
    return this.value.Applications
      .filter(application => application.IsActive)
      .map(value => ({
        Type: JobTypesEnum.DEPLOYMENT,
        Application: value.Application,
        Version: value.Version,
        Inventory: this.value.Inventory
      }));
  }
}
