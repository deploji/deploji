import { Component, OnInit } from '@angular/core';
import { App } from '../core/interfaces/app';
import { AppsService } from '../core/services/apps.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  apps: App[] = [];

  constructor(private appsService: AppsService) {
  }

  ngOnInit() {
    this.appsService.getApps().subscribe(apps => {
      this.apps = apps;
    });
  }
}
