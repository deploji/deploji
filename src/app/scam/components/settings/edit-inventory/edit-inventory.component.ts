import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InventoriesService } from '../../../../core/services/inventories.service';
import { InventoryForm } from '../../../../core/forms/inventory.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormProjectComponentModule } from '../../form/form-project/form-project.component';
import { FormProjectFileComponentModule } from '../../form/form-project-file/form-project-file.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
})
export class EditInventoryComponent implements OnInit {
  form = new InventoryForm();

  constructor(
    private inventoriesService: InventoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.inventoriesService.getInventory(Number(this.route.snapshot.paramMap.get('id'))).subscribe(inventory => {
        this.form.patchValue(inventory);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.inventoriesService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/inventories');
    });
  }
}

@NgModule({
    declarations: [EditInventoryComponent],
    exports: [EditInventoryComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormProjectComponentModule,
    FormProjectFileComponentModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class EditInventoryComponentModule {}
