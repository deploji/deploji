import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ProjectForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl(),
      RepoUrl: new FormControl(),
      RepoBranch: new FormControl('master'),
      RepoUser: new FormControl('git'),
      SshKey: new FormControl(),
    });
    this.RepoUrl.valueChanges.subscribe(value => {
      this.updateValidators(value);
    });
  }

  private updateValidators(value) {
    if (value.match(/http(s)?:\/\/.*/)) {
      this.SshKey.setValidators([]);
    } else {
      this.SshKey.setValidators([Validators.required]);
    }
  }

  get ID(): FormControl {
    return this.get('ID') as FormControl;
  }

  get Name(): FormControl {
    return this.get('Name') as FormControl;
  }

  get RepoUrl(): FormControl {
    return this.get('RepoUrl') as FormControl;
  }

  get RepoBranch(): FormControl {
    return this.get('RepoBranch') as FormControl;
  }

  get RepoUser(): FormControl {
    return this.get('RepoUser') as FormControl;
  }

  get SshKey(): FormControl {
    return this.get('SshKey') as FormControl;
  }
}
