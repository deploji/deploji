import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { JobsModule } from './jobs/jobs.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    AppRoutingModule,
    JobsModule,
  ]
})
export class ViewModule { }
