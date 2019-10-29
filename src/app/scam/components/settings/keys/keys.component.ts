import { Component, NgModule, OnInit } from '@angular/core';
import { SshKey } from '../../../../core/interfaces/ssh-key';
import { SshKeysService } from '../../../../core/services/ssh-keys.service';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditButtonComponentModule } from '../../shared/edit-button/edit-button.component';
import { DeleteButtonComponentModule } from '../../shared/delete-button/delete-button.component';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
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
      data: { title: 'Are you sure?', message: `Do you want do delete key ${key.Title}?`}
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

@NgModule({
    declarations: [KeysComponent],
    exports: [KeysComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    EditButtonComponentModule,
    DeleteButtonComponentModule,
  ]
})
export class KeysComponentModule { }
