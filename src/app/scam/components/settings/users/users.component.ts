import { Component, NgModule, OnInit } from '@angular/core';
import { User } from '../../../../core/interfaces/user';
import { UsersService } from '../../../../core/services/users.service';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  columnsToDisplay = ['username', 'name', 'surname', 'email', 'active', 'actions'];

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

@NgModule({
  declarations: [UsersComponent],
  exports: [UsersComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
  ]
})
export class UsersComponentModule {
}