import { Component, forwardRef, Input, NgModule, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { VersionsService } from '../../../../core/services/versions.service';
import { App } from '../../../../core/interfaces/app';
import { Version } from '../../../../core/interfaces/version';
import { map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-form-version',
  templateUrl: './form-version.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormVersionComponent),
      multi: true
    }
  ]
})
export class FormVersionComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() label: string;
  @Input() app: App;
  control = new FormControl();
  versions: Version[];
  filteredOptions: Observable<Version[]>;
  private subscription: Subscription;

  constructor(private versionsService: VersionsService) {
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
    this.filteredOptions = this.control.valueChanges.pipe(
      tap(value => this.propagateChange(value)),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Version[] {
    const filterValue = value.toLowerCase();
    return this.versions.filter(option => option.Name.toLowerCase().includes(filterValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.app && changes.app.currentValue) {
      this.versionsService.getVersions(changes.app.currentValue).subscribe(versions => {
        this.versions = versions;
        this.control.setValue(this.control.value || '');
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  compareFn(optionOne: string, optionTwo: string): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne === optionTwo;
  }
}

@NgModule({
  declarations: [FormVersionComponent],
  exports: [FormVersionComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ScrollingModule
  ]
})
export class FormVersionComponentModule { }
