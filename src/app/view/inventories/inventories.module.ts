import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoriesRoutingModule } from './inventories-routing.module';
import { InventoriesComponent } from './inventories.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { UrlsModule } from '../../scam/urls/urls.component';


@NgModule({
  declarations: [InventoriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    InventoriesRoutingModule,
    MatTableModule,
    MatCardModule,
    UrlsModule
  ]
})
export class InventoriesModule {
}
