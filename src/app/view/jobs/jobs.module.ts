import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { SharedModule } from '../../shared/shared.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { CreateDeploymentComponent } from './create-deployment/create-deployment.component';
import { CreateInventoryDeploymentComponent } from './create-inventory-deployment/create-inventory-deployment.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormApplicationModule } from '../../scam/form/form-application/form-application.component';
import { FormInventoryModule } from '../../scam/form/form-inventory/form-inventory.component';
import { MatTableModule } from '@angular/material/table';
import { JobStatusModule } from '../../scam/job-status/job-status.component';
import { JobTimeModule } from '../../scam/job-time/job-time.component';
import { UserAvatarModule } from '../../scam/user-avatar/user-avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormVersionModule } from '../../scam/form/form-version/form-version.component';
import { FormApplicationInventoryModule } from '../../scam/form/form-application-inventory/form-application-inventory.component';


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
    JobsRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormApplicationModule,
    FormInventoryModule,
    MatTableModule,
    JobStatusModule,
    JobTimeModule,
    UserAvatarModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatSlideToggleModule,
    ScrollingModule,
    MatCheckboxModule,
    FormVersionModule,
    FormApplicationInventoryModule
  ]
})
export class JobsModule {
}
