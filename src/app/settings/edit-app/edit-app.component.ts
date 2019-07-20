import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppsService} from '../../core/services/apps.service';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private appsService: AppsService, private router: Router, private route: ActivatedRoute) {
    this.form = fb.group({
      ID: [],
      Name: [],
      AnsibleName: [],
      Project: [],
      AnsiblePlaybook: [],
      Repository: [],
      RepositoryArtifact: [],
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.appsService.getApp(Number(this.route.snapshot.paramMap.get('id'))).subscribe(app => {
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
}
