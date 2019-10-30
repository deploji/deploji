import { Component, NgModule, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../core/services/projects.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectForm } from '../../../../core/forms/project.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormSshKeyComponentModule } from '../../shared/form/form-ssh-key/form-ssh-key.component';
import { MatButtonModule } from '@angular/material/button';
import { NotificationsWhenComponentModule } from '../../shared/notifications-when/notifications-when.component';
import { MatTabsModule } from '@angular/material';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
})
export class EditProjectComponent implements OnInit {

  public form = new ProjectForm();
  public projectId: number;

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.projectId) {
      this.projectsService.getProject(this.projectId).subscribe(project => {
        this.form.patchValue(project);
      });
    }
  }

  save() {
    if (this.form.valid) {
      this.projectsService.save(this.form.value).subscribe(() => {
        this.router.navigateByUrl('/settings/projects');
      });
    }
  }
}

@NgModule({
  declarations: [EditProjectComponent],
  exports: [EditProjectComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormSshKeyComponentModule,
    MatButtonModule,
    RouterModule,
    NotificationsWhenComponentModule,
    MatTabsModule
  ]
})
export class EditProjectComponentModule { }
