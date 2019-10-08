import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../../core/interfaces/project';
import { ProjectsService } from '../../../../core/services/projects.service';
import { MatDialog } from '@angular/material';
import { DialogSynchronizeComponent } from '../../shared/dialog/dialog-synchronize/dialog-synchronize.component';
import { DialogData } from '../../../../core/interfaces/dialog-data';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { RxStompService } from '@stomp/ng2-stompjs';
import { forkJoin, Subscription } from 'rxjs';
import { StatusMessage } from '../../../../core/interfaces/status-message';
import { JobStatus } from '../../../../core/enums/job-status.enum';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  dialogData: DialogData = {title: 'Project synchronization error'};
  private subscription: Subscription;

  constructor(private stomp: RxStompService, private projectsService: ProjectsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscription = this.stomp.watch('/exchange/job_statuses').subscribe((message) => {
      const statusMessage: StatusMessage = JSON.parse(message.body);
      const project = this.projects.find(value => value.synchronizeJobID === statusMessage.ID);
      if (project) {
        this.setProjectSyncStatus(project, statusMessage.Status);
      }
    });
    forkJoin([
      this.projectsService.getProjectSyncStatus(),
      this.projectsService.getProjects()
    ]).subscribe(([jobs, projects]) => {
      this.projects = projects;
      jobs.forEach(job => {
        const project = this.projects.find(value => value.ID === job.ProjectID);
        if (project) {
          this.setProjectSyncStatus(project, job.Status);
        }
      });
    });
  }

  public ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
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
    this.projectsService.synchronize(project).subscribe((job) => {
      project.synchronizing = true;
      project.synchronizationStatus = null;
      project.synchronizeJobID = job.ID;
    }, (error) => {
      this.dialogData.message = error.error;
      project.synchronizationStatus = 'error';
      project.synchronizing = false;
      this.openDialog();
    });
  }

  private setProjectSyncStatus(project: Project, status: JobStatus) {
    let syncStatus = null;
    let synchronizing = false;
    switch (status) {
      case JobStatus.COMPLETED:
        syncStatus = 'success';
        synchronizing = false;
        break;
      case JobStatus.FAILED:
        syncStatus = 'error';
        synchronizing = false;
        break;
      case JobStatus.PENDING:
      case JobStatus.PROCESSING:
        syncStatus = null;
        synchronizing = true;
        break;
    }
    project.synchronizationStatus = syncStatus;
    project.synchronizing = synchronizing;
  }
}

@NgModule({
    declarations: [ProjectsComponent],
    exports: [ProjectsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class ProjectsComponentModule {}
