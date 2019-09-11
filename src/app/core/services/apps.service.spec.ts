import { TestBed } from '@angular/core/testing';

import { AppsService } from './apps.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: AppsService = TestBed.get(AppsService);
    expect(service).toBeTruthy();
  });
});
