import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SshKeysService } from '../../core/services/ssh-keys.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ssh-key',
  templateUrl: './add-ssh-key.component.html',
  styleUrls: ['./add-ssh-key.component.scss']
})
export class AddSshKeyComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private keys: SshKeysService, private router: Router) {
    this.form = fb.group({
      Title: [],
      Key: []
    });
  }

  ngOnInit() {
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.keys.create(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/keys');
    });
  }
}
