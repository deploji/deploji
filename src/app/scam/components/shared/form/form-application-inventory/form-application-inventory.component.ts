import { Component, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { App } from '../../../../../core/interfaces/app';
import { CommonModule } from '@angular/common';
import { FormSelectComponentModule } from '../form-select/form-select.component';
import { ApplicationInventory } from '../../../../../core/interfaces/application-inventory';

@Component({
  selector: 'app-form-application-inventory',
  templateUrl: './form-application-inventory.component.html',
})
export class FormApplicationInventoryComponent implements OnChanges {
  @Input() label = 'Inventory';
  @Input() app: App;
  @Input() multiple = false;
  @Input() control = new FormControl();
  options: ApplicationInventory[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.app && changes.app.currentValue && changes.app.currentValue.Inventories) {
      this.options = this.app.Inventories.filter(value => value.IsActive === true);
    }
  }

  displayFn(option: ApplicationInventory) {
    if (!option || typeof option === 'string') {
      return option;
    }
    return option.Name || option.Inventory.Name;
  }
}

@NgModule({
  declarations: [FormApplicationInventoryComponent],
  exports: [FormApplicationInventoryComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule,
  ]
})
export class FormApplicationInventoryComponentModule { }
