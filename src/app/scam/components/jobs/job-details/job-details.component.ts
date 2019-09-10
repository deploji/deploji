import { AfterViewInit, Component, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../../../../core/services/jobs.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { JobLog } from '../../../../core/interfaces/job-log';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Job } from '../../../../core/interfaces/job';
import { StatusMessage } from '../../../../core/interfaces/status-message';
import { JobStatus } from '../../../../core/enums/job-status.enum';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { JobStatusComponentModule } from '../../shared/job-status/job-status.component';
import { UserAvatarComponentModule } from '../../shared/user-avatar/user-avatar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AnsiPipeModule } from '../../../pipes/ansi.pipe';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: CdkVirtualScrollViewport;
  job: Job;
  logs: JobLog[] = [];
  autoScroll = new FormControl(true);
  private logsSubscription: Subscription;
  private subscription = new Subscription();

  constructor(private jobsService: JobsService,
              private router: Router,
              private route: ActivatedRoute,
              private stomp: RxStompService) {
  }

  ngOnInit() {
    this.subscription.add(
      this.stomp.watch('/exchange/job_statuses').subscribe((message) => {
        const statusMessage = JSON.parse(message.body);
        this.updateStatus(statusMessage);
      })
    );
    this.subscription.add(
      this.autoScroll.valueChanges.subscribe(value => {
        if (value === true) {
          this.myScrollContainer.scrollTo({bottom: 0});
        }
      })
    );
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.jobsService.getJob(Number(this.route.snapshot.paramMap.get('id'))).subscribe(job => {
          this.job = job;
        });
        this.jobsService.getJobLogs(Number(this.route.snapshot.paramMap.get('id'))).subscribe(logs => {
          this.logs = logs;
        });
      }
      if (this.logsSubscription && !this.logsSubscription.closed) {
        this.logsSubscription.unsubscribe();
      }
      this.logsSubscription = this.stomp.watch(`/exchange/job_log_${this.route.snapshot.paramMap.get('id')}`).subscribe(value => {
        this.logs = [...this.logs, {Message: value.body}];
        if (this.autoScroll.value === true) {
          this.myScrollContainer.scrollTo({bottom: 0});
        }
      });
    });
  }

  relaunch() {
    this.jobsService.relaunch(this.job).subscribe(value => {
      this.router.navigateByUrl(`/jobs/${value.ID}`);
    });
  }

  private updateStatus(message: StatusMessage) {
    if (message.ID === this.job.ID) {
      this.job.Status = message.Status;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.myScrollContainer.scrollTo({bottom: 0});
    }, 500);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isCompleted(status: JobStatus) {
    return status === JobStatus.FAILED || status === JobStatus.COMPLETED;
  }
}

@NgModule({
    declarations: [JobDetailsComponent],
    exports: [JobDetailsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    JobStatusComponentModule,
    UserAvatarComponentModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    ScrollingModule,
    ReactiveFormsModule,
    AnsiPipeModule,
  ]
})
export class JobDetailsComponentModule {}
