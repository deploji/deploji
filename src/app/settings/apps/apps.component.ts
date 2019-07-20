import {Component, OnInit} from '@angular/core';
import {App} from '../../core/interfaces/app';
import {AppsService} from '../../core/services/apps.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {
  apps: App[] = [];

  constructor(private appsService: AppsService) { }

  ngOnInit() {
    this.appsService.getApps().subscribe(apps => {
      this.apps = apps;
    });
  }

  delete(app: App) {
    this.appsService.destroy(app).subscribe(() => {
      this.apps.splice(this.apps.indexOf(app), 1);
    });
  }

  synchronize(app: App) {
    this.appsService.synchronize(app).subscribe();
  }
}
