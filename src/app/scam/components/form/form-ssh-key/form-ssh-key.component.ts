import { Component, forwardRef, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SshKeysService } from '../../../../core/services/ssh-keys.service';
import { SshKey } from '../../../../core/interfaces/ssh-key';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-ssh-key',
  templateUrl: './form-ssh-key.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSshKeyComponent),
      multi: true
    }
  ]
})
export class FormSshKeyComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = 'SSH key';
  @Input() keys: SshKey[];
  control = new FormControl();
  private subscription: Subscription;

  constructor(private keysService: SshKeysService) {
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
    if (!this.keys) {
      this.keysService.getKeys().subscribe(keys => {
        this.keys = keys;
      });
    }
    this.subscription = this.control.valueChanges.subscribe(value => {
      this.propagateChange(value);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  compareFn(optionOne: SshKey, optionTwo: SshKey): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne.ID === optionTwo.ID;
  }
}

@NgModule({
  declarations: [FormSshKeyComponent],
  exports: [FormSshKeyComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class FormSshKeyComponentModule { }
