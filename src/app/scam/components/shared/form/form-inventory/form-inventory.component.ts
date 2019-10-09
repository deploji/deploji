import { AfterViewInit, Component, forwardRef, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Inventory } from '../../../../../core/interfaces/inventory';
import { InventoriesService } from '../../../../../core/services/inventories.service';
import { App } from '../../../../../core/interfaces/app';

@Component({
  selector: 'app-form-inventory',
  templateUrl: './form-inventory.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInventoryComponent),
      multi: true
    }
  ]
})
export class FormInventoryComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  @Input() label = 'Inventory';
  @Input() app: App;
  @Input() inventories: Inventory[] = [];
  control = new FormControl('');
  filteredOptions: Observable<Inventory[]>;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.app && changes.app.currentValue) {
      this.inventoriesService.getInventoriesByAppID(changes.app.currentValue.ID).subscribe(value => {
        this.inventories = value;
        this.control.setValue(this.control.value || '');
      });
    }
  }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      map(value => {
        if (typeof value === 'string') {
          return value;
        }
        this.propagateChange(value);
        return value ? value.Name : '';
      }),
      map(value => this._filter(value))
    );
    if (this.inventories.length === 0) {
      this.inventoriesService.getInventories().subscribe(inventories => {
        this.inventories = inventories;
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.control.setValue(this.control.value || '');
    });
  }

  displayFn(inventory?: Inventory): string | undefined {
    return inventory ? inventory.Name : undefined;
  }

  private _filter(value: string): Inventory[] {
    if (!value || !this.inventories) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.inventories.filter(option => option.Name.toLowerCase().includes(filterValue));
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
    ReactiveFormsModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class FormInventoryComponentModule { }
