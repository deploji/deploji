import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoriesService } from '../../core/services/repositories.service';

@Component({
  selector: 'app-edit-repository',
  templateUrl: './edit-repository.component.html',
  styleUrls: ['./edit-repository.component.scss']
})
export class EditRepositoryComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private repositoriesService: RepositoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      ID: [],
      Name: ['', [Validators.required]],
      Url: ['', [Validators.required, Validators.pattern(/http(s)?:\/\/.*/)]],
      Type: ['', [Validators.required]],
      Username: [],
      Password: [],
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.repositoriesService.getRepository(Number(this.route.snapshot.paramMap.get('id'))).subscribe(project => {
        this.form.patchValue(project);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.repositoriesService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/repositories');
    });
  }
}
