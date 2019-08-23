import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { VersionsService } from '../../core/services/versions.service';
import { App } from '../../core/interfaces/app';
import { Version } from '../../core/interfaces/version';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-version',
  templateUrl: './form-version.component.html',
  styleUrls: ['./form-version.component.scss'],
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
