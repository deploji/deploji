import { Component, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../../core/interfaces/user';
import { Md5 } from 'ts-md5/dist/md5';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
})
export class UserAvatarComponent implements OnChanges {
  @Input() user: User;
  @Input() size = 50;
  md5 = new Md5();
  hash: string | Int32Array;

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.user || !changes.user.currentValue || !changes.user.currentValue.Email) {
      return;
    }
    this.hash = this.md5.appendStr(changes.user.currentValue.Email.toLowerCase()).end();
  }
}

@NgModule({
  declarations: [UserAvatarComponent],
  exports: [UserAvatarComponent],
  imports: [
    CommonModule
  ]
})
export class UserAvatarComponentModule { }
