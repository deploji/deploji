import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {InventoriesService} from '../../core/services/inventories.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss']
})
export class EditInventoryComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventoriesService: InventoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      ID: [],
      Name: [],
      Project: [],
      SourceFile: [],
    });
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
