import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeploymentsRoutingModule } from './deployments-routing.module';
import { DeploymentsComponent } from './deployments.component';
import { SharedModule } from '../shared/shared.module';
import { CreateDeploymentComponent } from './create-deployment/create-deployment.component';
import { DeploymentDetailsComponent } from './deployment-details/deployment-details.component';
import { CreateInventoryDeploymentComponent } from './create-inventory-deployment/create-inventory-deployment.component';

@NgModule({
  declarations: [
    DeploymentsComponent,
    CreateDeploymentComponent,
    DeploymentDetailsComponent,
    CreateInventoryDeploymentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeploymentsRoutingModule,
  ]
})
export class DeploymentsModule {
}
