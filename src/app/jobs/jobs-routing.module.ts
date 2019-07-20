import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavResolve} from '../core/resolvers/nav.resolver';
import {JobsComponent} from './jobs.component';


const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    resolve: [NavResolve],
    data: {
      nav: {
        title: 'Jobs',
        items: []
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
