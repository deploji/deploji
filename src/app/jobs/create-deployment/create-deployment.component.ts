import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../../core/services/jobs.service';
import { CreateDeploymentForm } from '../../core/forms/create-deployment.form';

@Component({
  selector: 'app-create-deployment',
  templateUrl: './create-deployment.component.html',
  styleUrls: ['./create-deployment.component.scss']
})
export class CreateDeploymentComponent implements OnInit {
  form = new CreateDeploymentForm();

  constructor(private jobsService: JobsService, private router: Router) {
  }

  ngOnInit() {
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