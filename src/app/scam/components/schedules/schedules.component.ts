import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SchedulesService } from '../../../core/services/schedules.service';
import { Schedule } from '../../../core/interfaces/schedule';
import { EditButtonComponentModule } from '../shared/edit-button/edit-button.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
})
export class SchedulesComponent implements OnInit {
  columnsToDisplay = ['next', 'application', 'inventory', 'version', 'time', 'user', 'actions'];
  schedules: Schedule[];

  constructor(private schedulesService: SchedulesService) {
  }

  ngOnInit() {
    this.schedulesService.getAll().subscribe(schedules => {
      this.schedules = schedules;
    });
  }
}

@NgModule({
  declarations: [SchedulesComponent],
  exports: [SchedulesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    EditButtonComponentModule,
  ]
})
export class SchedulesComponentModule {
}
