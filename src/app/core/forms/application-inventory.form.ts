import { FormControl, FormGroup } from '@angular/forms';
import { App } from '../interfaces/app';
import { Inventory } from '../interfaces/inventory';

export class ApplicationInventoryForm extends FormGroup {
  constructor(app: App, inventory: Inventory) {
    super({
      Inventory: new FormControl(inventory),
      IsActive: new FormControl(),
      Application: new FormControl(app),
      ApplicationUrls: new FormControl()
    });
  }

  get Inventory() {
    return this.get('Inventory') as FormControl;
  }

  get IsActive() {
    return this.get('IsActive') as FormControl;
  }

  get Application() {
    return this.get('Application') as FormControl;
  }

  get ApplicationUrls() {
    return this.get('ApplicationUrls') as FormControl;
  }
}
