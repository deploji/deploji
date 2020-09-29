import { Component, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Observable, of, Subscription } from 'rxjs';
import { Page } from '../../../core/interfaces/page';
import { Collection } from '../../../core/utils/collection';
import { DeploymentFiltersForm } from '../../../core/forms/deployment-filters.form';
import { Router, RouterModule } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { StatusMessage } from '../../../core/interfaces/status-message';
import { map, tap } from 'rxjs/operators';
import { JobsService } from '../../../core/services/jobs.service';
import { Job } from '../../../core/interfaces/job';
import { JobStatus } from '../../../core/enums/job-status.enum';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormApplicationComponentModule } from '../shared/form/form-application/form-application.component';
import { FormInventoryComponentModule } from '../shared/form/form-inventory/form-inventory.component';
import { MatTableModule } from '@angular/material/table';
import { JobTypePipeModule } from '../../pipes/job-type.pipe';
import { UserAvatarComponentModule } from '../shared/user-avatar/user-avatar.component';
import { JobTimeComponentModule } from '../shared/job-time/job-time.component';
import { MatIconModule } from '@angular/material/icon';
import { JobStatusComponentModule } from '../shared/job-status/job-status.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { FormUserComponentModule } from '../shared/form/form-user/form-user.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  private subscription: Subscription;
  private currentPage: Page = { page: 0, limit: 10, orderBy: 'id desc'};
  jobs: Collection<Job>;
  columnsToDisplay = ['status', 'id', 'type', 'project', 'application', 'inventory', 'version', 'time', 'user', 'actions'];
  filters = new DeploymentFiltersForm();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private jobsService: JobsService,
    private stomp: RxStompService
  ) {
    this.filters.valueChanges.subscribe(value => {
      this.reload(this.currentPage, value);
    });
  }

  ngOnInit() {
    this.subscription = this.stomp.watch('/exchange/job_statuses').subscribe((message) => {
      const statusMessage = JSON.parse(message.body);
      this.updateStatus(statusMessage);
    });
    this.subscription.add(this.isHandset$.subscribe(isHeadset => {
      if (isHeadset) {
        this.columnsToDisplay = ['status', 'id', 'application', 'inventory'];
      } else {
        this.columnsToDisplay = ['status', 'id', 'type', 'project', 'application', 'inventory', 'version', 'time', 'user', 'actions'];
      }
    }));
    this.jobsService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.paginator.length = jobs.totalCount;
    });
  }

  public ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  private updateStatus(message: StatusMessage) {
    if (!this.jobs) {
      return;
    }
    const deployment = this.jobs.items.find(value => {
      return value.ID === message.ID;
    });
    let $deployment = of(deployment);
    if (!deployment) {
      $deployment = this.jobsService.getJob(message.ID).pipe(
        tap(value => this.jobs.items.push(value))
      );
    }
    $deployment.subscribe(value => {
      value.Status = message.Status;
    });
  }

  relaunch(job: Job) {
    this.jobsService.relaunch(job).subscribe(value => {
      this.jobs.items.push(value);
      this.router.navigateByUrl(`/jobs/${value.ID}`);
    });
  }

  page(pageEvent: PageEvent) {
    this.currentPage = { page: pageEvent.pageIndex, limit: pageEvent.pageSize, orderBy: 'id desc'};
    this.reload(this.currentPage, this.filters.value);
  }

  private reload(page: Page, filters: any) {
    this.jobsService.getJobs(filters, page).subscribe(value => {
      this.jobs = value;
      this.paginator.length = value.totalCount;
    });
  }

  isCompleted(job: Job) {
    return job.Status === JobStatus.FAILED || job.Status === JobStatus.COMPLETED;
  }
}

@NgModule({
  declarations: [JobsComponent],
  exports: [JobsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    FormApplicationComponentModule,
    FormInventoryComponentModule,
    MatTableModule,
    JobTypePipeModule,
    UserAvatarComponentModule,
    JobTimeComponentModule,
    MatIconModule,
    MatPaginatorModule,
    JobStatusComponentModule,
    MatCardModule,
    FormUserComponentModule,
  ]
})
export class JobsComponentModule {
}
