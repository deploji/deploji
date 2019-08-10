import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppsService } from '../../core/services/apps.service';
import { InventoriesService } from '../../core/services/inventories.service';
import { forkJoin } from 'rxjs';
import { ApplicationForm } from '../../core/forms/application.form';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent implements OnInit {
  form = new ApplicationForm();

  constructor(
    private appsService: AppsService,
    private router: Router,
    private inventoriesService: InventoriesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      forkJoin(
        this.appsService.getApp(Number(this.route.snapshot.paramMap.get('id'))),
        this.inventoriesService.getInventories()
      ).subscribe(([app, inventories]) => {
        this.form.createApplicationInventories(app, inventories);
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
}
