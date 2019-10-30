import { Component, NgModule, OnInit } from '@angular/core';
import { Repository } from '../../../../core/interfaces/repository';
import { RepositoriesService } from '../../../../core/services/repositories.service';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditButtonComponentModule } from '../../shared/edit-button/edit-button.component';
import { DeleteButtonComponentModule } from '../../shared/delete-button/delete-button.component';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
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
      data: { title: 'Are you sure?', message: `Do you want do delete repository ${repository.Name}?`}
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

@NgModule({
    declarations: [RepositoriesComponent],
    exports: [RepositoriesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    EditButtonComponentModule,
    DeleteButtonComponentModule,
  ]
})
export class RepositoriesComponentModule { }
