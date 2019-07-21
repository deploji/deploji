import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../core/interfaces/inventory';
import { InventoriesService } from '../../core/services/inventories.service';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.scss']
})
export class InventoriesComponent implements OnInit {
  inventories: Inventory[] = [];

  constructor(private inventoriesService: InventoriesService) {
  }

  ngOnInit() {
    this.inventoriesService.getInventories().subscribe(inventories => {
      this.inventories = inventories;
    });
  }

  delete(inventory: Inventory) {
    this.inventoriesService.destroy(inventory).subscribe(() => {
      this.inventories.splice(this.inventories.indexOf(inventory), 1);
    });
  }
}
