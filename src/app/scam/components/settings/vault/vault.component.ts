import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSshKeyComponentModule } from '../../shared/form/form-ssh-key/form-ssh-key.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VaultService } from '../../../../core/services/vault.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardService } from '../../../../core/services/clipboard.service';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
})
export class VaultComponent {
  form: FormGroup;
  encrypted: string;

  constructor(fb: FormBuilder, private vaultService: VaultService, private clipboard: ClipboardService) {
    this.form = fb.group({
      key: ['', Validators.required],
      name: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  encrypt() {
    if (this.form.invalid) {
      return;
    }
    this.vaultService.encrypt(this.form.value.key.ID, this.form.value.name, this.form.value.content).subscribe(value => {
      this.encrypted = value.Content;
    });
  }

  copy() {
    this.clipboard.copyTextToClipboard(this.encrypted);
  }
}
@NgModule({
  declarations: [VaultComponent],
  exports: [VaultComponent],
  imports: [
    CommonModule,
    FormSshKeyComponentModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class VaultComponentModule {}
