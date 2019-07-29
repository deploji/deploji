import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DeploymentsService } from '../../core/services/deployments.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inventory } from '../../core/interfaces/inventory';

@Component({
  selector: 'app-create-inventory-deployment',
  templateUrl: './create-inventory-deployment.component.html',
  styleUrls: ['./create-inventory-deployment.component.scss']
})
export class CreateInventoryDeploymentComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private subscription: Subscription;

  constructor(private fb: FormBuilder, private deploymentsService: DeploymentsService, private router: Router) {
    this.form = fb.group({
      Inventory: [],
      Applications: fb.array([]),
    });
  }

  ngOnInit() {
    this.subscription = this.form.get('Inventory').valueChanges.subscribe((selectedInventory: Inventory) => {
      this.applications.clear();
      selectedInventory.ApplicationInventories.forEach(inventory => {
        this.applications.push(
          this.fb.group({
            IsActive: [true],
            Application: [inventory.Application],
            Version: [],
          })
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  create() {
    if (!this.form.valid) {
      return;
    }
    this.form.value.Applications
      .filter(value => value.IsActive)
      .map(value => ({Application: value.Application, Version: value.Version, Inventory: this.form.value.Inventory}))
      .forEach(value => {
        this.deploymentsService.save(value).subscribe((deployment) => {
          this.router.navigateByUrl(`/deployments`);
        });
      });
  }

  get applications(): FormArray {
    return this.form.get('Applications') as FormArray;
   }
}
