import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavResolve } from '../../core/resolvers/nav.resolver';
import { TemplatesComponent, TemplatesComponentModule } from '../../scam/components/templates/templates.component';

const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent,
    resolve: [NavResolve],
    data: {
      nav: {
        title: 'Templates',
        items: []
      }
    }
  }
];

@NgModule({
  imports: [
    TemplatesComponentModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
