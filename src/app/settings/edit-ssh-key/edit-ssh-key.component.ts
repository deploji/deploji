import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SshKeysService } from '../../core/services/ssh-keys.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-ssh-key',
  templateUrl: './edit-ssh-key.component.html',
  styleUrls: ['./edit-ssh-key.component.scss']
})
export class EditSshKeyComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private keys: SshKeysService, private router: Router, private route: ActivatedRoute) {
    this.form = fb.group({
      ID: [],
      Title: [],
      Key: []
    });
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
