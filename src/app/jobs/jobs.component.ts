import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { of, Subscription } from 'rxjs';
import { Page } from '../core/interfaces/page';
import { Collection } from '../core/utils/collection';
import { DeploymentFiltersForm } from '../core/forms/deployment-filters.form';
import { Router } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { StatusMessage } from '../core/interfaces/status-message';
import { tap } from 'rxjs/operators';
import { JobsService } from '../core/services/jobs.service';
import { Job } from '../core/interfaces/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;
  private currentPage: Page = {page: 0, limit: 10, orderBy: 'id desc'};
  jobs: Collection<Job>;
  columnsToDisplay = ['status', 'id', 'type', 'project', 'application', 'inventory', 'version', 'time', 'actions'];
  filters = new DeploymentFiltersForm();

  constructor(
    private router: Router,
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
    this.currentPage = {page: pageEvent.pageIndex, limit: pageEvent.pageSize, orderBy: 'id desc'};
    this.reload(this.currentPage, this.filters.value);
  }

  private reload(page: Page, filters: any) {
    this.jobsService.getJobs(filters, page).subscribe(value => {
      this.jobs = value;
      this.paginator.length = value.totalCount;
    });
  }
}
