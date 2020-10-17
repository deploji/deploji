import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { App } from '../../../../core/interfaces/app';
import { AppsService } from '../../../../core/services/apps.service';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditButtonComponentModule } from '../../shared/edit-button/edit-button.component';
import { DeleteButtonComponentModule } from '../../shared/delete-button/delete-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirectiveModule } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
})
export class AppsComponent implements OnInit, OnDestroy {
  apps: App[] = [];
  filteredApps: App[] = [];
  columnsToDisplay = ['name', 'project', 'playbook', 'repository', 'artifact', 'actions'];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  searchControl = new FormControl();
  private subscription = new Subscription();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appsService: AppsService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscription.add(
      this.isHandset$.subscribe(isHeadset => {
        if (isHeadset) {
          this.columnsToDisplay = ['name', 'artifact', 'actions'];
        } else {
          this.columnsToDisplay = ['name', 'project', 'playbook', 'repository', 'artifact', 'actions'];
        }
      })
    );
    this.subscription.add(
      this.searchControl.valueChanges.subscribe((searchText: string) => {
        this.filteredApps = this.apps
          .filter(app =>
            app.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            app.Project?.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            app.AnsiblePlaybook.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            app.RepositoryArtifact.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            app.Repository?.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
      })
    );
    this.appsService.getApps().subscribe(apps => {
      this.apps = apps;
      this.filteredApps = apps;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(app: App) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {title: 'Are you sure?', message: `Do you want do delete application ${app.Name}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.appsService.destroy(app).subscribe(() => {
          this.apps.splice(this.apps.indexOf(app), 1);
          this.filteredApps.splice(this.apps.indexOf(app), 1);
        });
      }
    });
  }
}

@NgModule({
  declarations: [AppsComponent],
  exports: [AppsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    EditButtonComponentModule,
    DeleteButtonComponentModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HighlightDirectiveModule,
  ]
})
export class AppsComponentModule {
}
