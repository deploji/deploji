import { TestBed } from '@angular/core/testing';

import { NavService } from './nav.service';

describe('NavService', () => {
  beforeEach(() => TestBed.configureTestingModule({ }));

  it('should be created', () => {
    const service: NavService = TestBed.inject(NavService);
    expect(service).toBeTruthy();
  });

  it('should emit Navigation item', () => {
    const service: NavService = TestBed.inject(NavService);
    service.navObservable.subscribe((nav) => {
      expect(nav.items).toBeDefined();
      expect(nav.title).toBeDefined();
    });
    service.setNav({title: 'Foo', items: [{label: 'foo', link: 'bar'}]});
  });
});
