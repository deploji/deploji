import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../core/interfaces/job';
import { JobStatus } from '../../core/enums/job-status.enum';

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
