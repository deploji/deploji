import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavResolve } from '../../core/resolvers/nav.resolver';
import {
  ApplicationsListComponent,
  ApplicationsListComponentModule
} from '../../scam/components/applications/applications-list/applications-list.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsListComponent,
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
    ApplicationsListComponentModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {
}
