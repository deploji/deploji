import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavResolve } from '../core/resolvers/nav.resolver';
import { InventoriesComponent } from './inventories.component';


const routes: Routes = [
  {
    path: '',
    component: InventoriesComponent,
    resolve: [NavResolve],
    data: {
      nav: {
        title: 'Inventories',
        items: []
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoriesRoutingModule {
}
