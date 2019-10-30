import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JobsService } from '../../../../core/services/jobs.service';
import { CreateDeploymentForm } from '../../../../core/forms/create-deployment.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormApplicationComponentModule } from '../../shared/form/form-application/form-application.component';
import { FormApplicationInventoryComponentModule } from '../../shared/form/form-application-inventory/form-application-inventory.component';
import { FormVersionComponentModule } from '../../shared/form/form-version/form-version.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-deployment',
  templateUrl: './create-deployment.component.html',
})
export class CreateDeploymentComponent {
  form = new CreateDeploymentForm();

  constructor(private jobsService: JobsService, private router: Router) {
  }

  create() {
    if (!this.form.valid) {
      return;
    }
    this.form.deploymentsValue.forEach(deployment => {
      this.jobsService.save(deployment).subscribe(() => {
        this.router.navigateByUrl(`/jobs`);
      });
    });
  }
}

@NgModule({
  declarations: [CreateDeploymentComponent],
  exports: [CreateDeploymentComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormApplicationComponentModule,
    FormApplicationInventoryComponentModule,
    FormVersionComponentModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class CreateDeploymentComponentModule {
}
