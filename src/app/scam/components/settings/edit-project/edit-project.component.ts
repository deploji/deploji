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

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
})
export class EditProjectComponent implements OnInit {
  form = new ProjectForm();

  constructor(private projectsService: ProjectsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.projectsService.getProject(Number(this.route.snapshot.paramMap.get('id'))).subscribe(project => {
        this.form.patchValue(project);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.projectsService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/projects');
    });
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
  ]
})
export class EditProjectComponentModule { }
