import {Component, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {NavService} from '../../core/services/nav.service';
import {Nav} from '../../core/interfaces/nav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  nav: Nav;

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.navService.navObservable.subscribe((nav: Nav) => {
      this.nav = nav;
    });
  }

}
