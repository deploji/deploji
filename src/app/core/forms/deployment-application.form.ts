import { FormControl, FormGroup } from '@angular/forms';
import { ApplicationInventory } from '../interfaces/application-inventory';

export class DeploymentApplicationForm extends FormGroup {
  constructor(inventory: ApplicationInventory) {
    super({
        IsActive: new FormControl(true),
        Application: new FormControl(inventory.Application),
        Version: new FormControl(),
        Playbook: new FormControl(inventory.Playbook),
        ExtraVariables: new FormControl(inventory.ExtraVariables),
        KeyID: new FormControl(inventory.KeyID),
        VaultKeyID: new FormControl(inventory.VaultKeyID),
    });
  }

  get Version() {
    return this.get('Version') as FormControl;
  }
}
