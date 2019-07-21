import { Component, OnInit } from '@angular/core';
import { SshKey } from '../../core/interfaces/ssh-key';
import { SshKeysService } from '../../core/services/ssh-keys.service';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {
  keys: SshKey[] = [];

  constructor(private keysService: SshKeysService) {
  }

  ngOnInit() {
    this.keysService.getKeys().subscribe(keys => {
      this.keys = keys;
    });
  }

  delete(key: SshKey) {
    this.keysService.destroy(key).subscribe(() => {
      this.keys.splice(this.keys.indexOf(key), 1);
    });
  }
}
