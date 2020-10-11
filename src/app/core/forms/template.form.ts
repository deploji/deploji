import { FormControl, FormGroup } from '@angular/forms';

export class TemplateForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl(),
      Project: new FormControl(),
      Inventory: new FormControl(),
      Playbook: new FormControl(),
      SshKey: new FormControl(),
      PromptSshKey: new FormControl(),
      VaultKey: new FormControl(),
      PromptVaultKey: new FormControl(),
      PromptPlaybook: new FormControl(),
      PromptInventory: new FormControl(),
      PromptProject: new FormControl(),
      PromptExtraVariables: new FormControl(),
      ExtraVariables: new FormControl(),
    });
  }

  get ID(): FormControl {
    return this.get('ID') as FormControl;
  }

  get Name(): FormControl {
    return this.get('Name') as FormControl;
  }

  get Project(): FormControl {
    return this.get('Project') as FormControl;
  }

  get Inventory(): FormControl {
    return this.get('Inventory') as FormControl;
  }

  get Playbook(): FormControl {
    return this.get('Playbook') as FormControl;
  }

  get SshKey(): FormControl {
    return this.get('SshKey') as FormControl;
  }

  get PromptSshKey(): FormControl {
    return this.get('PromptSshKey') as FormControl;
  }

  get VaultKey(): FormControl {
    return this.get('VaultKey') as FormControl;
  }
  get PromptVaultKey(): FormControl {
    return this.get('PromptVaultKey') as FormControl;
  }

  get PromptPlaybook(): FormControl {
    return this.get('PromptPlaybook') as FormControl;
  }

  get PromptInventory(): FormControl {
    return this.get('PromptInventory') as FormControl;
  }

  get PromptProject(): FormControl {
    return this.get('PromptProject') as FormControl;
  }

  get PromptExtraVariables(): FormControl {
    return this.get('PromptExtraVariables') as FormControl;
  }

  get ExtraVariables(): FormControl {
    return this.get('ExtraVariables') as FormControl;
  }
}
