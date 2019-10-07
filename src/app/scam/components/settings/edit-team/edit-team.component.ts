import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { TeamsService } from '../../../../core/services/teams.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ManageUsersComponentModule } from '../../shared/manage-users/manage-users.component';
import { ManagePermissionsComponentModule } from '../../shared/manage-permissions/manage-permissions.component';
import { TeamForm } from '../../../../core/forms/team.form';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
})
export class EditTeamComponent implements OnInit {
  form = new TeamForm();
  teamId: number;

  constructor(
    private teamsService: TeamsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.teamId = Number(this.route.snapshot.paramMap.get('id'));
      this.teamsService.getTeam(this.teamId).subscribe(user => {
        this.form.patchValue(user);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.teamsService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/teams');
    });
  }
}

@NgModule({
  declarations: [EditTeamComponent],
  exports: [EditTeamComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    ManageUsersComponentModule,
    ManagePermissionsComponentModule,
  ]
})
export class EditTeamComponentModule {
}
