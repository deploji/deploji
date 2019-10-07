import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TeamsService } from '../../../../core/services/teams.service';
import { Team } from '../../../../core/interfaces/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  columnsToDisplay = ['name', 'actions'];

  constructor(private teamsService: TeamsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.teamsService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  delete(team: Team) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {title: 'Are you sure?', message: `Do you want do delete team ${team.Name}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.teamsService.destroy(team.ID).subscribe(() => {
          this.teams.splice(this.teams.indexOf(team), 1);
        });
      }
    });
  }
}

@NgModule({
  declarations: [TeamsComponent],
  exports: [TeamsComponent],
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
export class TeamsComponentModule {
}
