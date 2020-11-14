import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VaultService } from './vault.service';

describe('VaultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should create', () => {
    const service = TestBed.inject(VaultService);
    expect(service).toBeTruthy();
  });
});
