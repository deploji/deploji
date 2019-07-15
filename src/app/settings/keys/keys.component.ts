import {Component, OnInit} from '@angular/core';
import {SshKey} from '../../core/interfaces/ssh-key';
import {SshKeysService} from '../../core/services/ssh-keys.service';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {
  keys: SshKey[] = [
    {
      fingerprint: '41:8b:4b:b5:a6:f6:70:2b:b7:0c:03:5a:48:8e:cd:40',
      title: 'sotomski@sotomski-ThinkPad-T470'
    },
    {
      fingerprint: '41:8b:4b:b5:a6:f6:70:2b:b7:0c:03:5a:48:8e:cd:40',
      title: 'sotomski@sotomski-ThinkPad-T470'
    }
  ];

  constructor(private keysService: SshKeysService) { }

  ngOnInit() {
    // this.keysService.getKeys().subscribe(keys => {
    //   this.keys = keys;
    // });
  }

  delete(key: SshKey) {
    this.keysService.destroy(key).subscribe();
  }
}
