import { Component, OnInit } from '@angular/core';
import { SshKeysService } from '../../../core/services/ssh-keys.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SshKeyForm } from '../../../core/forms/ssh-key.form';

@Component({
  selector: 'app-edit-ssh-key',
  templateUrl: './edit-ssh-key.component.html',
  styleUrls: ['./edit-ssh-key.component.scss']
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
