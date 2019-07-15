import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeploymentsComponent} from './deployments.component';
import {NavResolve} from '../core/resolvers/nav.resolver';


const routes: Routes = [
  {
    path: 'deployments',
    component: DeploymentsComponent,
    resolve: [NavResolve],
    data: {
      nav: {
        title: 'Deployments',
        items: [
          {
            label: 'Projects',
            link: 'projects'
          }
        ]
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeploymentsRoutingModule { }
