import { FormControl, FormGroup } from '@angular/forms';

export class ProjectForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl(),
      RepoUrl: new FormControl(),
      RepoBranch: new FormControl(['master']),
      RepoUser: new FormControl(['git']),
      SshKey: new FormControl(),
    });
  }
}
