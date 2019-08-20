import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { SharedModule } from '../shared/shared.module';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateLaunchComponent } from './template-launch/template-launch.component';


@NgModule({
  declarations: [TemplatesComponent, TemplateListComponent, TemplateLaunchComponent],
  imports: [
    CommonModule,
    SharedModule,
    TemplatesRoutingModule,
  ]
})
export class TemplatesModule { }
