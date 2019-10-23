import { TestBed } from '@angular/core/testing';

import { NotificationChannelsService } from './notification-channels.service';

describe('NotificationChannelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationChannelsService = TestBed.get(NotificationChannelsService);
    expect(service).toBeTruthy();
  });
});
