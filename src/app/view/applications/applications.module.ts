import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UrlsModule } from '../../scam/urls/urls.component';

@NgModule({
  declarations: [ApplicationsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutingModule,
    MatCardModule,
    MatTableModule,
    UrlsModule
  ]
})
export class ApplicationsModule {
}
