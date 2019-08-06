import { Component, OnInit } from '@angular/core';
import { User } from '../../core/interfaces/user';
import { UsersService } from '../../core/services/users.service';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  delete(user: User) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {title: 'Are you sure?', message: `Do you want do delete user ${user.Name}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.usersService.destroy(user.ID).subscribe(() => {
          this.users.splice(this.users.indexOf(user), 1);
        });
      }
    });
  }
}
