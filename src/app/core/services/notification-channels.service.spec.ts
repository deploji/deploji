import { TestBed } from '@angular/core/testing';
import { NotificationChannelsService } from './notification-channels.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotificationChannelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: NotificationChannelsService = TestBed.get(NotificationChannelsService);
    expect(service).toBeTruthy();
  });
});
