import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../core/interfaces/user';
import { UsersService } from '../../../../core/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditButtonComponentModule } from '../../shared/edit-button/edit-button.component';
import { DeleteButtonComponentModule } from '../../shared/delete-button/delete-button.component';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HighlightDirectiveModule } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  columnsToDisplay = ['username', 'name', 'surname', 'email', 'type', 'active', 'actions'];
  searchControl = new FormControl();
  private subscription = new Subscription();

  constructor(private usersService: UsersService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
    this.subscription.add(
      this.searchControl.valueChanges.subscribe((searchText: string) => {
        this.filteredUsers = this.users
          .filter(user =>
            user.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            user.Username.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            user.Surname.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            user.Email.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            user.Type.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(user: User) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: { title: 'Are you sure?', message: `Do you want do delete user ${user.Name}?`}
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
    EditButtonComponentModule,
    DeleteButtonComponentModule,
    MatInputModule,
    ReactiveFormsModule,
    HighlightDirectiveModule,
  ]
})
export class UsersComponentModule {
}
