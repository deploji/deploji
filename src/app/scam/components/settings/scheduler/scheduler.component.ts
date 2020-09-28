import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
})
export class SchedulerComponent {
}
@NgModule({
  declarations: [SchedulerComponent],
  exports: [SchedulerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
  ]
})
export class SchedulerComponentModule {}
