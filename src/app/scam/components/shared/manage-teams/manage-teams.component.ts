import { Component, Input, NgModule, OnInit } from '@angular/core';
import { TeamUser } from '../../../../core/interfaces/team-user';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.scss']
})
export class ManageTeamsComponent implements OnInit {
  @Input() teams: TeamUser[] = [
    {Team: 'a team', Role: 'Read'},
    {Team: 'b team', Role: 'Admin'}
  ];
  columnsToDisplay = ['name', 'role'];

  ngOnInit() {
  }
}

@NgModule({
  declarations: [ManageTeamsComponent],
  exports: [ManageTeamsComponent],
  imports: [
    CommonModule,
    MatTableModule,
  ]
})
export class ManageTeamsComponentModule {
}
