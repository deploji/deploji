import { Component, forwardRef, Input, NgModule, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Inventory } from '../../../../core/interfaces/inventory';
import { App } from '../../../../core/interfaces/app';
import { InventoriesService } from '../../../../core/services/inventories.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-inventory',
  templateUrl: './form-inventory.component.html',
  styleUrls: ['./form-inventory.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInventoryComponent),
      multi: true
    }
  ]
})
export class FormInventoryComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() label = 'Inventory';
  @Input() app: App;
  @Input() multiple = false;
  @Input() inventories: Inventory[];
  control = new FormControl();
  private subscription: Subscription;

  constructor(private inventoriesService: InventoriesService) {
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
    if (!this.app && !this.inventories) {
      this.inventoriesService.getInventories().subscribe(inventories => {
        this.inventories = inventories;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.app && changes.app.currentValue) {
      this.inventoriesService.getInventoriesByAppID(changes.app.currentValue.ID).subscribe(inventories => {
        this.inventories = inventories;
      });
    }
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
  declarations: [FormInventoryComponent],
  exports: [FormInventoryComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class FormInventoryComponentModule { }
