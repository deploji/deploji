import { Component, OnInit } from '@angular/core';
import { Repository } from '../../core/interfaces/repository';
import { RepositoriesService } from '../../core/services/repositories.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  repositories: Repository[] = [];

  constructor(private repositoriesService: RepositoriesService) {
  }

  ngOnInit() {
    this.repositoriesService.getRepositories().subscribe(repositories => {
      this.repositories = repositories;
    });
  }

  delete(repository: Repository) {
    this.repositoriesService.destroy(repository).subscribe(() => {
      this.repositories.splice(this.repositories.indexOf(repository), 1);
    });
  }
}
