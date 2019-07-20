import { TestBed } from '@angular/core/testing';

import { AppsService } from './apps.service';

describe('AppsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppsService = TestBed.get(AppsService);
    expect(service).toBeTruthy();
  });
});
