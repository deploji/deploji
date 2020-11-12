import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationInventoriesService } from './application-inventories.service';

describe('ApplicationInventoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: ApplicationInventoriesService = TestBed.inject(ApplicationInventoriesService);
    expect(service).toBeTruthy();
  });
});
