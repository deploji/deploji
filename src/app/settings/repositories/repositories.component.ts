import { Component, OnInit } from '@angular/core';
import { Repository } from '../../core/interfaces/repository';
import { RepositoriesService } from '../../core/services/repositories.service';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  repositories: Repository[] = [];

  constructor(private repositoriesService: RepositoriesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.repositoriesService.getRepositories().subscribe(repositories => {
      this.repositories = repositories;
    });
  }

  delete(repository: Repository) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {title: 'Are you sure?', message: `Do you want do delete repository ${repository.Name}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.repositoriesService.destroy(repository).subscribe(() => {
          this.repositories.splice(this.repositories.indexOf(repository), 1);
        });
      }
    });
  }
}
