import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RepositoryTypesEnum } from '../enums/repository-types.enum';

export class RepositoryForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Name: new FormControl('', [Validators.required]),
      Url: new FormControl('', [Validators.required, Validators.pattern(/http(s)?:\/\/.*/)]),
      Type: new FormControl('', [Validators.required]),
      NexusName: new FormControl(),
      Username: new FormControl(),
      Password: new FormControl(),
    });
    this.Type.valueChanges.subscribe(value => {
      if (value === RepositoryTypesEnum.NEXUS_V3_MAVEN) {
        this.NexusName.setValidators([Validators.required]);
      } else {
        this.NexusName.setValidators([]);
        this.NexusName.updateValueAndValidity();
      }
    });
  }

  get ID(): FormControl {
    return this.get('ID') as FormControl;
  }

  get Name(): FormControl {
    return this.get('Name') as FormControl;
  }

  get Type(): FormControl {
    return this.get('Type') as FormControl;
  }

  get Url(): FormControl {
    return this.get('Url') as FormControl;
  }

  get NexusName(): FormControl {
    return this.get('NexusName') as FormControl;
  }
}
