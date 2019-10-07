import { Component, forwardRef, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ObjectTypesEnum } from '../../../../../core/enums/object-types.enum';
import { MatSelectModule } from '@angular/material/select';
import { ActionTypesEnum } from '../../../../../core/enums/action-types.enum';

export declare type ObjectType = 'inventories' | 'applications' | 'templates' | 'ssh-keys';

@Component({
  selector: 'app-form-action-type',
  templateUrl: './form-action-type.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormActionTypeComponent),
      multi: true
    }
  ]
})
export class FormActionTypeComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() label = 'Action';
  @Input() type: ObjectType = ObjectTypesEnum.INVENTORY;
  control = new FormControl();
  options = [ActionTypesEnum.READ, ActionTypesEnum.WRITE, ActionTypesEnum.ADMIN, ActionTypesEnum.USE];

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
    this.control.valueChanges.subscribe((value) => {
      this.propagateChange(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      switch (changes.type.currentValue) {
        case ObjectTypesEnum.KEY:
          this.options = [ActionTypesEnum.USE, ActionTypesEnum.ADMIN, ActionTypesEnum.WRITE, ActionTypesEnum.READ];
          break;
        case ObjectTypesEnum.APPLICATION:
          this.options = [ActionTypesEnum.ADMIN, ActionTypesEnum.WRITE, ActionTypesEnum.READ];
          break;
        case ObjectTypesEnum.INVENTORY:
          this.options = [ActionTypesEnum.ADMIN, ActionTypesEnum.WRITE, ActionTypesEnum.READ];
          break;
        case ObjectTypesEnum.TEMPLATES:
          this.options = [ActionTypesEnum.ADMIN, ActionTypesEnum.WRITE, ActionTypesEnum.READ];
          break;
        default:
          this.options = [ActionTypesEnum.ADMIN, ActionTypesEnum.WRITE, ActionTypesEnum.READ];
      }
    }
  }
}

@NgModule({
  declarations: [FormActionTypeComponent],
  exports: [FormActionTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class FormRoleComponentModule {
}
