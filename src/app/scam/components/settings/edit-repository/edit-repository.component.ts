import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RepositoriesService } from '../../../../core/services/repositories.service';
import { RepositoryForm } from '../../../../core/forms/repository.form';
import { RepositoryTypesEnum } from '../../../../core/enums/repository-types.enum';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-repository',
  templateUrl: './edit-repository.component.html',
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

@NgModule({
    declarations: [EditRepositoryComponent],
    exports: [EditRepositoryComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class EditRepositoryComponentModule {}
