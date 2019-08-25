import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../core/interfaces/job';

@Component({
  selector: 'app-job-time',
  templateUrl: './job-time.component.html',
  styleUrls: ['./job-time.component.scss']
})
export class JobTimeComponent implements OnInit {
  @Input() job: Job;

  constructor() { }

  ngOnInit() {
  }
}
