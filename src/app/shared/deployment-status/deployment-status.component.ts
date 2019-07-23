import { Component, Input, OnInit } from '@angular/core';
import { Deployment } from '../../core/interfaces/deployment';
import { JobStatus } from '../../core/enums/job-status.enum';

@Component({
  selector: 'app-deployment-status',
  templateUrl: './deployment-status.component.html',
  styleUrls: ['./deployment-status.component.scss']
})
export class DeploymentStatusComponent implements OnInit {
  @Input() deployment: Deployment;
  status = JobStatus;

  constructor() { }

  ngOnInit() {
  }
}
