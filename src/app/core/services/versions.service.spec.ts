import { TestBed } from '@angular/core/testing';

import { VersionsService } from './versions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VersionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: VersionsService = TestBed.inject(VersionsService);
    expect(service).toBeTruthy();
  });
});
