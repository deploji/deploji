import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { SharedModule } from '../shared/shared.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { CreateDeploymentComponent } from './create-deployment/create-deployment.component';
import { CreateInventoryDeploymentComponent } from './create-inventory-deployment/create-inventory-deployment.component';


@NgModule({
  declarations: [
    JobsComponent,
    JobDetailsComponent,
    CreateDeploymentComponent,
    CreateInventoryDeploymentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    JobsRoutingModule
  ]
})
export class JobsModule {
}
