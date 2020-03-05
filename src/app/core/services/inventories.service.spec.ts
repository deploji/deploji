import { TestBed } from '@angular/core/testing';

import { InventoriesService } from './inventories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InventoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    const service: InventoriesService = TestBed.inject(InventoriesService);
    expect(service).toBeTruthy();
  });
});
