import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Permission } from '../interfaces/permission';

export class PermissionForm extends FormGroup {
  constructor() {
    super({
      SubjectType: new FormControl('', [Validators.required]),
      ObjectType: new FormControl('', [Validators.required]),
      Object: new FormControl('', [Validators.required]),
      Subject: new FormControl('', [Validators.required]),
      Action: new FormControl('', [Validators.required]),
    });
    this.ObjectType.valueChanges.subscribe(() => {
      this.Object.reset();
    });
    this.SubjectType.valueChanges.subscribe(() => {
      this.Subject.reset();
    });
  }

  get SubjectType() {
    return this.get('SubjectType') as FormControl;
  }

  get Subject() {
    return this.get('Subject') as FormControl;
  }

  get ObjectType() {
    return this.get('ObjectType') as FormControl;
  }

  get Object() {
    return this.get('Object') as FormControl;
  }

  get Action() {
    return this.get('Action') as FormControl;
  }

  getValue() {
    const value: Permission = this.value;
    value.ObjectID = this.value.Object.ID;
    value.SubjectID = this.value.Subject.ID;
    return value;
  }
}
