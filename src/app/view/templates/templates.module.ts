import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { SharedModule } from '../../shared/shared.module';
import { TemplateListModule } from '../../scam/template-list/template-list.component';
import { TemplateLaunchModule } from '../../scam/template-launch/template-launch.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    TemplatesRoutingModule,
    TemplateListModule,
    TemplateLaunchModule,
    MatButtonModule,
  ]
})
export class TemplatesModule { }
