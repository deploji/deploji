import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeploymentsRoutingModule} from './deployments-routing.module';
import {DeploymentsComponent} from './deployments.component';
import {SharedModule} from '../shared/shared.module';
import {CreateDeploymentComponent} from './create-deployment/create-deployment.component';
import {DeploymentDetailsComponent} from './deployment-details/deployment-details.component';


@NgModule({
  declarations: [
    DeploymentsComponent,
    CreateDeploymentComponent,
    DeploymentDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeploymentsRoutingModule
  ]
})
export class DeploymentsModule { }
