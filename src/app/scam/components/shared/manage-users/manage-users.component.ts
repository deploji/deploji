import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TeamUser } from '../../../../core/interfaces/team-user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  @Input() users: TeamUser[] = [
    {Username: 'admin', Role: 'Read'},
    {Username: 'admin', Role: 'Admin'}
  ];
  columnsToDisplay = ['username', 'role'];

  ngOnInit() {
  }
}

@NgModule({
  declarations: [ManageUsersComponent],
  exports: [ManageUsersComponent],
  imports: [
    CommonModule,
    MatTableModule,
  ]
})
export class ManageUsersComponentModule {
}
