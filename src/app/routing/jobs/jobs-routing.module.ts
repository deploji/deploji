import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavResolve } from '../../core/resolvers/nav.resolver';
import { JobsComponent, JobsComponentModule } from '../../scam/components/jobs/jobs.component';
import {
  JobDetailsComponent,
  JobDetailsComponentModule
} from '../../scam/components/jobs/job-details/job-details.component';
import {
  CreateInventoryDeploymentComponent, CreateInventoryDeploymentComponentModule
} from '../../scam/components/jobs/create-inventory-deployment/create-inventory-deployment.component';
import {
  CreateDeploymentComponent,
  CreateDeploymentComponentModule
} from '../../scam/components/jobs/create-deployment/create-deployment.component';

const routes: Routes = [
  {
    path: 'jobs',
    component: JobsComponent,
    resolve: [NavResolve],
    data: {
      nav: {
        title: 'Jobs',
        items: []
      }
    }
  },
  {
    path: 'jobs/create',
    component: CreateDeploymentComponent
  },
  {
    path: 'jobs/create-inventory',
    component: CreateInventoryDeploymentComponent
  },
  {
    path: 'jobs/:id',
    component: JobDetailsComponent
  }
];

@NgModule({
  imports: [
    JobsComponentModule,
    CreateDeploymentComponentModule,
    CreateInventoryDeploymentComponentModule,
    JobDetailsComponentModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class JobsRoutingModule {
}
