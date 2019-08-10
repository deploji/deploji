import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Inventory } from '../interfaces/inventory';
import { App } from '../interfaces/app';
import { ApplicationInventoryForm } from './application-inventory.form';

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

  get Inventories() {
    return this.get('Inventories') as FormArray;
  }

  createApplicationInventories(app: App, inventories: Inventory[]) {
    inventories.forEach(inventory => {
      this.Inventories.push(
        new ApplicationInventoryForm(app, inventory)
      );
    });
  }
}
