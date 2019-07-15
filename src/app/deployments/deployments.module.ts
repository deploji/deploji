import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeploymentsRoutingModule } from './deployments-routing.module';
import { DeploymentsComponent } from './deployments.component';


@NgModule({
  declarations: [
    DeploymentsComponent
  ],
  imports: [
    CommonModule,
    DeploymentsRoutingModule
  ]
})
export class DeploymentsModule { }
