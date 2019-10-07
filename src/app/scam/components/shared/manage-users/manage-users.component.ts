import { Component, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TeamsService } from '../../../../core/services/teams.service';
import { MatButtonModule } from '@angular/material/button';
import { FormUserComponentModule } from '../form/form-user/form-user.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../../../../core/interfaces/user';
import { forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnChanges {
  @Input() teamId: number;
  columnsToDisplay = ['username', 'actions'];
  teamUsers: User[];
  availableUsers: User[];
  allUsers: User[];
  selectedUser = new FormControl();
  showUserSelect = false;

  constructor(private teamsService: TeamsService, private usersService: UsersService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.teamId && changes.teamId.currentValue) {
      forkJoin([
        this.teamsService.getTeamUsers(changes.teamId.currentValue),
        this.usersService.getUsers()
      ])
      .subscribe(([teamUsers, allUsers]) => {
        this.teamUsers = teamUsers;
        this.allUsers = allUsers;
        this.updateAvailableUsers();
      });
    }
  }

  private updateAvailableUsers() {
    const userIds = this.teamUsers.map(value => value.ID);
    this.availableUsers = this.allUsers.filter(value => userIds.indexOf(value.ID) === -1);
  }

  addUser() {
    if (this.selectedUser.value) {
      this.teamsService.addUser(this.teamId, this.selectedUser.value.ID).subscribe(user => {
        this.teamUsers = [...this.teamUsers, user];
        this.showUserSelect = false;
        this.selectedUser.reset();
        this.updateAvailableUsers();
      });
    }
  }

  toggleUserSelect() {
    this.showUserSelect = !this.showUserSelect;
  }

  delete(user: User) {
    this.teamsService.removeUser(this.teamId, user.ID).subscribe(() => {
      this.teamUsers = this.teamUsers.filter(value => value.Username !== user.Username);
      this.updateAvailableUsers();
    });
  }
}

@NgModule({
  declarations: [ManageUsersComponent],
  exports: [ManageUsersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    FormUserComponentModule,
    ReactiveFormsModule,
    MatIconModule,
  ]
})
export class ManageUsersComponentModule {
}
