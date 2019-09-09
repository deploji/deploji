import { Component, forwardRef, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Inventory } from '../../../core/interfaces/inventory';
import { App } from '../../../core/interfaces/app';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-application-inventory',
  templateUrl: './form-application-inventory.component.html',
  styleUrls: ['./form-application-inventory.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormApplicationInventoryComponent),
      multi: true
    }
  ]
})
export class FormApplicationInventoryComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = 'Inventory';
  @Input() app: App;
  @Input() multiple = false;
  control = new FormControl();
  private subscription: Subscription;

  get inventories() {
    if (!this.app || !this.app.Inventories) {
      return [];
    }
    return this.app.Inventories.filter(value => value.IsActive === true);
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.control.disable();
  }

  writeValue(obj: any): void {
    this.control.setValue(obj);
  }

  ngOnInit(): void {
    this.subscription = this.control.valueChanges.subscribe(value => {
      this.propagateChange(value);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  compareFn(optionOne: Inventory, optionTwo: Inventory): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne.ID === optionTwo.ID;
  }
}

@NgModule({
  declarations: [FormApplicationInventoryComponent],
  exports: [FormApplicationInventoryComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class FormApplicationInventoryModule { }
