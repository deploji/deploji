import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Inventory } from '../../core/interfaces/inventory';
import { App } from '../../core/interfaces/app';

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
