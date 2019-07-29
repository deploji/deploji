import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DeploymentsService } from '../../core/services/deployments.service';

@Component({
  selector: 'app-create-deployment',
  templateUrl: './create-deployment.component.html',
  styleUrls: ['./create-deployment.component.scss']
})
export class CreateDeploymentComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private deploymentsService: DeploymentsService, private router: Router) {
    this.form = fb.group({
      Application: [],
      Inventories: [],
      Version: [],
    });
  }

  ngOnInit() {
  }

  create() {
    if (!this.form.valid) {
      return;
    }
    this.form.value.Inventories
      .map(value => ({Application: this.form.value.Application, Version: this.form.value.Version, Inventory: value}))
      .forEach(value => {
        this.deploymentsService.save(value).subscribe((deployment) => {
          this.router.navigateByUrl(`/deployments`);
        });
      });
    }
}
