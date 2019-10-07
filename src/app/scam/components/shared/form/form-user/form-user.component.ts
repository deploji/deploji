import { Component, forwardRef, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { User } from '../../../../../core/interfaces/user';
import { UsersService } from '../../../../../core/services/users.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormUserComponent),
      multi: true
    }
  ]
})
export class FormUserComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = 'User';
  @Input() users: User[];
  control = new FormControl();
  filteredOptions: User[];
  private subscription: Subscription;

  constructor(private usersService: UsersService) {
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
    this.control.valueChanges.pipe(
      map(value => {
        if (value && typeof value === 'string') {
          return value;
        }
        this.propagateChange(value);
        return value ? value.Username : '';
      }),
      map(value => this._filter(value))
    ).subscribe(value => {
      this.filteredOptions = value;
    });
    if (!this.users) {
      this.usersService.getUsers().subscribe(users => {
        this.users = users;
        this.filteredOptions = users;
      });
    }
  }

  private _filter(value: string): User[] {
    const filterValue = value ? value.toLowerCase() : '';
    if (!this.users) {
      return [];
    }
    return this.users.filter(option => option.Username.toLowerCase().indexOf(filterValue) !== -1);
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  displayFn(user?: User): string | undefined {
    return user ? user.Username : undefined;
  }

  compareFn(optionOne: string, optionTwo: string): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne === optionTwo;
  }
}

@NgModule({
  declarations: [FormUserComponent],
  exports: [FormUserComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ScrollingModule
  ]
})
export class FormUserComponentModule { }
