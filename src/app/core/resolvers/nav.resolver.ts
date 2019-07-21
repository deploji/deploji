import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { NavService } from '../services/nav.service';

@Injectable()
export class NavResolve implements Resolve<any> {
  constructor(private navService: NavService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    if (route.data.nav) {
      this.navService.setNav(route.data.nav);
    }
    return null;
  }
}
