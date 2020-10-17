import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SchedulesService } from '../../../../core/services/schedules.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
})
export class SchedulerComponent {
  form: FormGroup;

  constructor(fb: FormBuilder, private schedulesService: SchedulesService) {
    this.form = fb.group({
      StartFrom: [new Date()],
      EndOn: [new Date()],
      CronExpression: ['* * * * * *'],
      Job: [{ApplicationID: 1}]
    });
  }

  save() {
    this.schedulesService.save(this.form.value).subscribe();
  }
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
    ReactiveFormsModule,
  ]
})
export class SchedulerComponentModule {}
