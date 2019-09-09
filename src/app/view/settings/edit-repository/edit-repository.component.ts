import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoriesService } from '../../../core/services/repositories.service';
import { RepositoryForm } from '../../../core/forms/repository.form';
import { RepositoryTypesEnum } from '../../../core/enums/repository-types.enum';

@Component({
  selector: 'app-edit-repository',
  templateUrl: './edit-repository.component.html',
  styleUrls: ['./edit-repository.component.scss']
})
export class EditRepositoryComponent implements OnInit {
  form = new RepositoryForm();
  RepositoryTypes = RepositoryTypesEnum;

  constructor(
    private repositoriesService: RepositoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
