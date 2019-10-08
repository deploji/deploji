import { Component, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavService } from '../../../../core/services/nav.service';
import { Nav } from '../../../../core/interfaces/nav';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserTypesEnum } from '../../../../core/enums/user-types.enum';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', {static: false}) drawer;
  UserTypes = UserTypesEnum;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  nav: Nav;
  opened: boolean;
  title: string;

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private authService: AuthService) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.navService.navObservable.subscribe((nav: Nav) => {
      this.nav = nav;
      this.opened = !(!nav.items || !Array.isArray(nav.items) || nav.items.length === 0);
    });
  }

  logout() {
    this.authService.logout();
  }
}

@NgModule({
  declarations: [NavComponent],
  exports: [NavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    MatListModule,
    NgxPermissionsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class NavComponentModule { }
