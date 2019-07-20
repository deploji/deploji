import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeploymentsComponent} from './deployments.component';
import {NavResolve} from '../core/resolvers/nav.resolver';
import {CreateDeploymentComponent} from './create-deployment/create-deployment.component';
import {DeploymentDetailsComponent} from './deployment-details/deployment-details.component';

const routes: Routes = [
  {
    path: 'deployments',
    component: DeploymentsComponent,
    resolve: [NavResolve],
    data: {
      nav: {
        title: 'Deployments',
        items: []
      }
    }
  },
  {
    path: 'deployments/create',
    component: CreateDeploymentComponent
  },
  {
    path: 'deployments/:id',
    component: DeploymentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeploymentsRoutingModule { }
