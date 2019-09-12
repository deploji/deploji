import { Component, NgModule, OnInit } from '@angular/core';
import { SshKeysService } from '../../../../core/services/ssh-keys.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SshKeyForm } from '../../../../core/forms/ssh-key.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-ssh-key',
  templateUrl: './edit-ssh-key.component.html',
})
export class EditSshKeyComponent implements OnInit {
  form = new SshKeyForm();

  constructor(private keys: SshKeysService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.keys.getKey(Number(this.route.snapshot.paramMap.get('id'))).subscribe(key => {
        this.form.patchValue(key);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.keys.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/keys');
    });
  }
}

@NgModule({
    declarations: [EditSshKeyComponent],
    exports: [EditSshKeyComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class EditSshKeyComponentModule {}
