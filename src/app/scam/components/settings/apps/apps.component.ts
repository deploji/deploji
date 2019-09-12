import { Component, NgModule, OnInit } from '@angular/core';
import { App } from '../../../../core/interfaces/app';
import { AppsService } from '../../../../core/services/apps.service';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
})
export class AppsComponent implements OnInit {
  apps: App[] = [];

  constructor(private appsService: AppsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.appsService.getApps().subscribe(apps => {
      this.apps = apps;
    });
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
  ]
})
export class AppsComponentModule {}
