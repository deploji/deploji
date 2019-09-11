import { TestBed } from '@angular/core/testing';

import { SshKeysService } from './ssh-keys.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SshKeysService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: SshKeysService = TestBed.get(SshKeysService);
    expect(service).toBeTruthy();
  });
});
