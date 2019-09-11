import { Component, NgModule } from '@angular/core';
import { JobsService } from '../../../../core/services/jobs.service';
import { Router, RouterModule } from '@angular/router';
import { CreateInventoryDeploymentForm } from '../../../../core/forms/create-inventory-deployment.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInventoryComponentModule } from '../../form/form-inventory/form-inventory.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormVersionComponentModule } from '../../form/form-version/form-version.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-inventory-deployment',
  templateUrl: './create-inventory-deployment.component.html',
  styleUrls: ['./create-inventory-deployment.component.scss']
})
export class CreateInventoryDeploymentComponent {
  form = new CreateInventoryDeploymentForm();

  constructor(private jobsService: JobsService, private router: Router) {
  }

  create() {
    if (!this.form.valid) {
      return;
    }
    this.form.deploymentsValue.forEach(value => {
      this.jobsService.save(value).subscribe(() => {
        this.router.navigateByUrl(`/jobs`);
      });
    });
  }
}

@NgModule({
  declarations: [CreateInventoryDeploymentComponent],
  exports: [CreateInventoryDeploymentComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormInventoryComponentModule,
    MatCheckboxModule,
    FormVersionComponentModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class CreateInventoryDeploymentComponentModule {}
