import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SshKeysService } from '../../../../../core/services/ssh-keys.service';
import { SshKey } from '../../../../../core/interfaces/ssh-key';
import { CommonModule } from '@angular/common';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-ssh-key',
  templateUrl: './form-ssh-key.component.html',
})
export class FormSshKeyComponent implements OnInit {
  @Input() label = 'Key';
  @Input() keys: SshKey[] = [];
  @Input() control = new FormControl();
  @Input() multiple = false;

  constructor(private keysService: SshKeysService) {
  }

  ngOnInit(): void {
    if (this.keys.length === 0) {
      this.keysService.getKeys().subscribe(keys => {
        this.keys = keys;
      });
    }
  }

  displayFn(key: SshKey) {
    return key.Title;
  }
}

@NgModule({
  declarations: [FormSshKeyComponent],
  exports: [FormSshKeyComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule
  ]
})
export class FormSshKeyComponentModule { }
