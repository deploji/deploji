import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavResolve } from '../../core/resolvers/nav.resolver';
import {
  ApplicationsComponent,
  ApplicationsComponentModule
} from '../../scam/components/applications/applications.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    resolve: [NavResolve],
    data: {
      nav: {
        title: 'Applications',
        items: []
      }
    }
  }
];

@NgModule({
  imports: [
    ApplicationsComponentModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {
}
