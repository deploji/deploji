import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectsService } from '../../../../../core/services/projects.service';
import { Project } from '../../../../../core/interfaces/project';
import { CommonModule } from '@angular/common';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
})
export class FormProjectComponent implements OnInit {
  @Input() label = 'Project';
  @Input() control = new FormControl();
  @Input() multiple = false;
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}

@NgModule({
  declarations: [FormProjectComponent],
  exports: [FormProjectComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule
  ]
})
export class FormProjectComponentModule { }
