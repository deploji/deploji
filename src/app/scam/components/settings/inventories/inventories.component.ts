import { Component, NgModule, OnInit } from '@angular/core';
import { Inventory } from '../../../../core/interfaces/inventory';
import { InventoriesService } from '../../../../core/services/inventories.service';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EditButtonComponentModule } from '../../shared/edit-button/edit-button.component';
import { DeleteButtonComponentModule } from '../../shared/delete-button/delete-button.component';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
})
export class InventoriesComponent implements OnInit {
  inventories: Inventory[] = [];
  columnsToDisplay = ['name', 'project', 'file', 'actions'];

  constructor(private inventoriesService: InventoriesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.inventoriesService.getInventories().subscribe(inventories => {
      this.inventories = inventories;
    });
  }

  delete(inventory: Inventory) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: { title: 'Are you sure?', message: `Do you want do delete inventory ${inventory.Name}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.inventoriesService.destroy(inventory).subscribe(() => {
          this.inventories.splice(this.inventories.indexOf(inventory), 1);
        });
      }
    });
  }
}

@NgModule({
    declarations: [InventoriesComponent],
    exports: [InventoriesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    EditButtonComponentModule,
    DeleteButtonComponentModule,
  ]
})
export class InventoriesComponentModule { }
