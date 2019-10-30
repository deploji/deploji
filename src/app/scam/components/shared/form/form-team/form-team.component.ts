import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Team } from '../../../../../core/interfaces/team';
import { TeamsService } from '../../../../../core/services/teams.service';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-team',
  templateUrl: './form-team.component.html',
})
export class FormTeamComponent implements OnInit {
  @Input() label = 'Team';
  @Input() teams: Team[] = [];
  @Input() control = new FormControl();
  @Input() multiple = false;

  constructor(private teamsService: TeamsService) {
  }

  ngOnInit(): void {
    if (this.teams.length === 0) {
      this.teamsService.getTeams().subscribe(teams => {
        this.teams = teams;
      });
    }
  }
}

@NgModule({
  declarations: [FormTeamComponent],
  exports: [FormTeamComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule,
  ]
})
export class FormTeamComponentModule { }
