import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavService} from '../../core/services/nav.service';
import {Nav} from '../../core/interfaces/nav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', {static: false}) drawer;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  nav: Nav;
  opened: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.navService.navObservable.subscribe((nav: Nav) => {
      this.nav = nav;
      if (!nav.items || !Array.isArray(nav.items) || nav.items.length === 0) {
        this.opened = false;
      } else {
        this.opened = true;
      }
    });
  }

}
