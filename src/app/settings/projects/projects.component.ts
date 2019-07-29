import { Component, OnInit } from '@angular/core';
import { Project } from '../../core/interfaces/project';
import { ProjectsService } from '../../core/services/projects.service';
import { MatDialog } from '@angular/material';
import { DialogSynchronizeComponent } from '../../shared/dialog-synchronize/dialog-synchronize.component';
import { DialogData } from '../../core/interfaces/dialog-data';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  dialogData: DialogData = {title: 'Project synchronization error'};

  constructor(private projectsService: ProjectsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  delete(project: Project) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {title: 'Are you sure?', message: `Do you want do delete project ${project.Name}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.projectsService.destroy(project).subscribe(() => {
          this.projects.splice(this.projects.indexOf(project), 1);
        });
      }
    });
  }

  openDialog(): void {
    this.dialog.open(DialogSynchronizeComponent, {
      width: '500px',
      data: this.dialogData
    });
  }

  synchronize(project: Project) {
    project.synchronizing = true;
    this.projectsService.synchronize(project).subscribe(() => {
      project.synchronizationStatus = 'success';
      project.synchronizing = false;
    }, (error) => {
      this.dialogData.message = error.error;
      project.synchronizationStatus = 'error';
      project.synchronizing = false;
      this.openDialog();
    }, () => {
      project.synchronizing = false;
    });
  }
}
