import { Component, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Inventory } from '../../../../../core/interfaces/inventory';
import { InventoriesService } from '../../../../../core/services/inventories.service';
import { App } from '../../../../../core/interfaces/app';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-inventory',
  templateUrl: './form-inventory.component.html',
})
export class FormInventoryComponent implements OnInit, OnChanges {
  @Input() label = 'Inventory';
  @Input() app: App;
  @Input() control = new FormControl();
  @Input() inventories: Inventory[] = [];
  @Input() multiple = false;

  constructor(private inventoriesService: InventoriesService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.app && changes.app.currentValue) {
      this.inventoriesService.getInventoriesByAppID(changes.app.currentValue.ID).subscribe(value => {
        this.inventories = value;
      });
    }
  }

  ngOnInit(): void {
    if (this.inventories.length === 0) {
      this.inventoriesService.getInventories().subscribe(inventories => {
        this.inventories = inventories;
      });
    }
  }
}

@NgModule({
  declarations: [FormInventoryComponent],
  exports: [FormInventoryComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule
  ]
})
export class FormInventoryComponentModule { }
