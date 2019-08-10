import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../core/services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectForm } from '../../core/forms/project.form';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
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
