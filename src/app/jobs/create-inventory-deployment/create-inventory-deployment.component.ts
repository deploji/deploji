import { Component } from '@angular/core';
import { JobsService } from '../../core/services/jobs.service';
import { Router } from '@angular/router';
import { CreateInventoryDeploymentForm } from '../../core/forms/create-inventory-deployment.form';

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
