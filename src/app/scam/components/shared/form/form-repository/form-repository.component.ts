import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Project } from '../../../../../core/interfaces/project';
import { RepositoriesService } from '../../../../../core/services/repositories.service';
import { Repository } from '../../../../../core/interfaces/repository';
import { CommonModule } from '@angular/common';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-repository',
  templateUrl: './form-repository.component.html',
})
export class FormRepositoryComponent implements OnInit {
  @Input() label: string;
  @Input() project: Project;
  @Input() multiple = false;
  @Input() control = new FormControl();
  repositories: Repository[] = [];

  constructor(private repositoriesService: RepositoriesService) {
  }

  ngOnInit(): void {
    this.repositoriesService.getRepositories().subscribe(repositories => {
      this.repositories = repositories;
    });
  }
}

@NgModule({
  declarations: [FormRepositoryComponent],
  exports: [FormRepositoryComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule,
  ]
})
export class FormRepositoryComponentModule { }
