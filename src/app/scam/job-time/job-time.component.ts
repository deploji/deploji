import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Job } from '../../core/interfaces/job';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DurationModule } from '../duration/duration.component';
import { SharedModule } from '../../shared/shared.module';

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

@NgModule({
  declarations: [JobTimeComponent],
  exports: [JobTimeComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    DurationModule,
    SharedModule,
  ]
})
export class JobTimeModule { }
