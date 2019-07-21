import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ApplicationsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule {
}
