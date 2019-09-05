import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../core/interfaces/user';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnChanges {
  @Input() user: User;
  @Input() size = 50;
  md5 = new Md5();
  hash: string | Int32Array;

  ngOnChanges(changes: SimpleChanges) {
    this.hash = this.md5.appendStr(changes.user.currentValue.Email.toLowerCase()).end();
  }
}
