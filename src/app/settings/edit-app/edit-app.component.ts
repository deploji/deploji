import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppsService } from '../../core/services/apps.service';
import { InventoriesService } from '../../core/services/inventories.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appsService: AppsService,
    private router: Router,
    private inventoriesService: InventoriesService,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      ID: [],
      Name: [],
      AnsibleName: [],
      Project: [],
      AnsiblePlaybook: [],
      Repository: [],
      RepositoryArtifact: [],
      Inventories: fb.array([]),
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      forkJoin(
        this.appsService.getApp(Number(this.route.snapshot.paramMap.get('id'))),
        this.inventoriesService.getInventories()
      ).subscribe(([app, inventories]) => {
        inventories.forEach(inventory => {
          this.inventories.push(
            this.fb.group({
              Inventory: [inventory],
              IsActive: [],
              Application: [app],
              ApplicationUrls: []
            })
          );
        });
        this.form.patchValue(app);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.appsService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/apps');
    });
  }

  compareFN(opt1: FormControl, opt2: FormControl): boolean {
    return opt1.value.Inventory.ID === opt2.value.Inventory.ID;
  }

  get inventories(): FormArray {
    return this.form.get('Inventories') as FormArray;
  }
}
