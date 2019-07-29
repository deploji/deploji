import { Component, OnInit } from '@angular/core';
import { SshKey } from '../../core/interfaces/ssh-key';
import { SshKeysService } from '../../core/services/ssh-keys.service';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {
  keys: SshKey[] = [];

  constructor(private keysService: SshKeysService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.keysService.getKeys().subscribe(keys => {
      this.keys = keys;
    });
  }

  delete(key: SshKey) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {title: 'Are you sure?', message: `Do you want do delete key ${key.Title}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.keysService.destroy(key).subscribe(() => {
          this.keys.splice(this.keys.indexOf(key), 1);
        });
      }
    });
  }
}
