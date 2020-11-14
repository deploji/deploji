import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: PermissionsService = TestBed.inject(PermissionsService);
    expect(service).toBeTruthy();
  });
});
