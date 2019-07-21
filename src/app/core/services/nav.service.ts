import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Nav } from '../interfaces/nav';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  nav = new BehaviorSubject<Nav>({title: 'Menu', items: []});

  constructor() {
  }

  get navObservable(): Observable<Nav> {
    return this.nav.asObservable();
  }

  setNav(nav: Nav) {
    this.nav.next(nav);
  }
}
