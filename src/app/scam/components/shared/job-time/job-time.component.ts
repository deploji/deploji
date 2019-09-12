import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Job } from '../../../../core/interfaces/job';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimeAgoPipeModule } from '../../../pipes/time-ago.pipe';
import { DurationComponentModule } from '../duration/duration.component';

@Component({
  selector: 'app-job-time',
  templateUrl: './job-time.component.html',
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
    TimeAgoPipeModule,
    DurationComponentModule,
  ]
})
export class JobTimeComponentModule { }
