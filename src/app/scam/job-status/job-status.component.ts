import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Job } from '../../core/interfaces/job';
import { JobStatus } from '../../core/enums/job-status.enum';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.scss']
})
export class JobStatusComponent implements OnInit {
  @Input() job: Job;
  status = JobStatus;

  constructor() { }

  ngOnInit() {
  }
}

@NgModule({
  declarations: [JobStatusComponent],
  exports: [JobStatusComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    RouterModule
  ]
})
export class JobStatusModule { }
