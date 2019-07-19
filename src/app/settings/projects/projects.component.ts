import {Component, OnInit} from '@angular/core';
import {Project} from '../../core/interfaces/project';
import {ProjectsService} from '../../core/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  delete(project: Project) {
    this.projectsService.destroy(project).subscribe();
  }

  synchronize(project: Project) {
    this.projectsService.synchronize(project).subscribe();
  }
}
