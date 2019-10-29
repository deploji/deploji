import { Component, Input, NgModule } from '@angular/core';
import { Job } from '../../../../core/interfaces/job';
import { JobStatus } from '../../../../core/enums/job-status.enum';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.scss']
})
export class JobStatusComponent {
  @Input() job: Job;
  status = JobStatus;
}

@NgModule({
  declarations: [JobStatusComponent],
  exports: [JobStatusComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class JobStatusComponentModule { }
