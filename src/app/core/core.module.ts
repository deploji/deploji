import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavResolve } from './resolvers/nav.resolver';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  providers: [
    NavResolve
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class CoreModule {
}
