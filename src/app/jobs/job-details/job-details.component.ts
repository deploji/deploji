import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../core/services/jobs.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { JobLog } from '../../core/interfaces/job-log';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Job } from '../../core/interfaces/job';

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
  private subscription = new Subscription();

  constructor(private jobsService: JobsService, private route: ActivatedRoute, private stomp: RxStompService) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.jobsService.getJob(Number(this.route.snapshot.paramMap.get('id'))).subscribe(job => {
        this.job = job;
      });
      this.jobsService.getJobLogs(Number(this.route.snapshot.paramMap.get('id'))).subscribe(logs => {
        this.logs = logs;
      });
    }
    this.subscription.add(
      this.stomp.watch(`/exchange/job_log_${this.route.snapshot.paramMap.get('id')}`).subscribe(value => {
        this.logs = [...this.logs, {Message: value.body}];
        if (this.autoScroll.value === true) {
          this.myScrollContainer.scrollTo({bottom: 0});
        }
      })
    );
    this.subscription.add(
      this.autoScroll.valueChanges.subscribe(value => {
        if (value === true) {
          this.myScrollContainer.scrollTo({bottom: 0});
        }
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.myScrollContainer.scrollTo({bottom: 0});
    }, 500);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
