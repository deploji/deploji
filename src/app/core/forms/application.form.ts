import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { App } from '../interfaces/app';
import { ApplicationInventoryForm } from './application-inventory.form';
import { ApplicationInventory } from '../interfaces/application-inventory';

export class ApplicationForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl(),
      AnsibleName: new FormControl(),
      Project: new FormControl(),
      AnsiblePlaybook: new FormControl(),
      Repository: new FormControl(),
      RepositoryArtifact: new FormControl(),
      RepositoryGroup: new FormControl(),
      Inventories: new FormArray([]),
    });
  }

  get ID() {
    return this.get('ID') as FormControl;
  }

  get Name() {
    return this.get('Name') as FormControl;
  }

  get AnsibleName() {
    return this.get('AnsibleName') as FormControl;
  }

  get Project() {
    return this.get('Project') as FormControl;
  }

  get AnsiblePlaybook() {
    return this.get('AnsiblePlaybook') as FormControl;
  }

  get Repository() {
    return this.get('Repository') as FormControl;
  }

  get RepositoryArtifact() {
    return this.get('RepositoryArtifact') as FormControl;
  }

  get RepositoryGroup() {
    return this.get('RepositoryGroup') as FormControl;
  }

  get InventoriesArray(): FormArray {
    return this.get('Inventories') as FormArray;
  }

  get Inventories(): ApplicationInventoryForm[] {
    return this.InventoriesArray.controls as ApplicationInventoryForm[];
  }

  createApplicationInventories(app: App) {
    app.Inventories.forEach(inventory => {
      const inventoryForm = new ApplicationInventoryForm();
      inventoryForm.patchValue(inventory);
      this.Inventories.push(inventoryForm);
    });
  }

  addInventory(appID: number) {
    const inventoryForm = new ApplicationInventoryForm();
    inventoryForm.ApplicationID.setValue(appID);
    this.Inventories.push(inventoryForm);
  }

  removeInventory(inventory: ApplicationInventory) {
    this.InventoriesArray.removeAt(this.InventoriesArray.getRawValue().findIndex(value => inventory.ID === value.ID));
  }
}
