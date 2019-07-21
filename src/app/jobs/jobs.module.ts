import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [JobsComponent],
  imports: [
    CommonModule,
    SharedModule,
    JobsRoutingModule
  ]
})
export class JobsModule {
}
