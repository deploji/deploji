import { Component, OnInit } from '@angular/core';
import { App } from '../../../core/interfaces/app';
import { AppsService } from '../../../core/services/apps.service';
import { DialogConfirmComponent } from '../../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
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
