import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavResolve } from '../core/resolvers/nav.resolver';
import { JobsComponent } from './jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { CreateInventoryDeploymentComponent } from './create-inventory-deployment/create-inventory-deployment.component';
import { CreateDeploymentComponent } from './create-deployment/create-deployment.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule {
}
