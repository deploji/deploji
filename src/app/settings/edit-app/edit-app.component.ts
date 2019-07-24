import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppsService } from '../../core/services/apps.service';
import { InventoriesService } from '../../core/services/inventories.service';
import { ApplicationInventory } from '../../core/interfaces/application-inventory';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent implements OnInit {
  form: FormGroup;
  inventories: ApplicationInventory[];

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
      Inventories: [],
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      forkJoin(
        this.appsService.getApp(Number(this.route.snapshot.paramMap.get('id'))),
        this.inventoriesService.getInventories()
      ).subscribe(([app, inventories]) => {
        this.form.patchValue(app);
        this.inventories = inventories.map(inventory => ({Inventory: inventory, Application: app}));
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

  compareFN(opt1: ApplicationInventory, opt2: ApplicationInventory): boolean {
    return opt1.Inventory.ID === opt2.Inventory.ID;
  }
}
