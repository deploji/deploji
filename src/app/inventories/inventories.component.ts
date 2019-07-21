import { Component, OnInit } from '@angular/core';
import { InventoriesService } from '../core/services/inventories.service';
import { Inventory } from '../core/interfaces/inventory';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.scss']
})
export class InventoriesComponent implements OnInit {
  inventories: Inventory[];

  constructor(private inventoriesService: InventoriesService) {
  }

  ngOnInit() {
    this.inventoriesService.getInventories().subscribe(inventories => {
      this.inventories = inventories;
    });
  }
}
