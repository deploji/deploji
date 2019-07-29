import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SshKeysService } from '../../core/services/ssh-keys.service';
import { SshKey } from '../../core/interfaces/ssh-key';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-ssh-key',
  templateUrl: './form-ssh-key.component.html',
  styleUrls: ['./form-ssh-key.component.scss'],
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
  control = new FormControl();
  keys: SshKey[];
  private subscription: Subscription;

  constructor(private keysService: SshKeysService) {
  }

  propagateChange = (_: any) => {
  };

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
    this.keysService.getKeys().subscribe(keys => {
      this.keys = keys;
    });
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
