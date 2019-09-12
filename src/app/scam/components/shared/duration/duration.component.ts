import { Component, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { CommonModule } from '@angular/common';
import { DurationPipeModule } from '../../../pipes/duration.pipe';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
})
export class DurationComponent implements OnInit, OnChanges {
  @Input() from: any;
  @Input() to: any;
  time: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.time = moment.duration(moment(changes.to.currentValue).diff(moment(changes.from.currentValue))).as('millisecond');
  }
}

@NgModule({
    declarations: [DurationComponent],
    exports: [DurationComponent],
  imports: [
    CommonModule,
    DurationPipeModule,
  ]
})
export class DurationComponentModule {}
