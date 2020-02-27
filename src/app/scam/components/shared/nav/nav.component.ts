import { Component, EventEmitter, NgModule, OnInit, Output, ViewChild } from '@angular/core';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() theme = new EventEmitter<string>();
  @ViewChild('drawer') drawer;
  userTypes = UserTypesEnum;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  nav: Nav;
  opened: boolean;
  title: string;

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private authService: AuthService) {
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

  setTheme(theme: string) {
    this.theme.emit(theme);
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
    MatIconModule,
    MatTooltipModule,
    MatMenuModule
  ]
})
export class NavComponentModule { }
