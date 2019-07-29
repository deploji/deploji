import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
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
