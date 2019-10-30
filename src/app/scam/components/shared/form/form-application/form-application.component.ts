import { Component, forwardRef, Input, NgModule, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { App } from '../../../../../core/interfaces/app';
import { AppsService } from '../../../../../core/services/apps.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-application',
  templateUrl: './form-application.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormApplicationComponent),
      multi: true
    }
  ]
})
export class FormApplicationComponent implements ControlValueAccessor, OnInit {
  @Input() label = 'Application';
  control = new FormControl();
  apps: App[];
  filteredOptions: Observable<App[]>;

  constructor(private appsService: AppsService) {
  }

  propagateChange = (_: any) => {
    // do nothing
  }

  onTouched = (_: any) => {
    // do nothing
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  writeValue(obj: any): void {
    this.control.setValue(obj);
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
    this.appsService.getApps().subscribe(apps => {
      this.apps = apps;
      this.control.setValue(this.control.value || '');
    });
  }

  displayFn(app?: App): string | undefined {
    return app ? app.Name : undefined;
  }

  private _filter(value: string): App[] {
    const filterValue = value.toLowerCase();
    return this.apps.filter(option => option.Name.toLowerCase().includes(filterValue));
  }

  compareFn(optionOne: App, optionTwo: App): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne.ID === optionTwo.ID;
  }
}

@NgModule({
  declarations: [FormApplicationComponent],
  exports: [FormApplicationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class FormApplicationComponentModule { }
