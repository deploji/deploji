import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SshKeysService} from '../../core/services/ssh-keys.service';

@Component({
  selector: 'app-add-ssh-key',
  templateUrl: './add-ssh-key.component.html',
  styleUrls: ['./add-ssh-key.component.scss']
})
export class AddSshKeyComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private keys: SshKeysService) {
    this.form = fb.group({
      title: [],
      key: []
    });
  }

  ngOnInit() {
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.keys.create(this.form.value).subscribe();
  }
}
