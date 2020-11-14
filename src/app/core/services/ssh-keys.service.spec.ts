import { TestBed } from '@angular/core/testing';
import { SshKeysService } from './ssh-keys.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('SshKeysService', () => {

  const httpClientSpy = jasmine.createSpyObj<HttpClient>(['post', 'put']);
  httpClientSpy.post.and.returnValues(of({}));
  httpClientSpy.put.and.returnValues(of({}));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {provide: HttpClient, useValue: httpClientSpy}
    ]
  }));

  it('should be created', () => {
    const service: SshKeysService = TestBed.inject(SshKeysService);
    expect(service).toBeTruthy();
  });

  it('should save new ssh key using POST', () => {
    const service: SshKeysService = TestBed.inject(SshKeysService);
    service.save({Title: ''}).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });

  it('should save existing ssh key using PUT', () => {
    const service: SshKeysService = TestBed.inject(SshKeysService);
    service.save({ID: 1, Title: ''}).subscribe(() => {
      expect(httpClientSpy.put).toHaveBeenCalled();
    });
  });
});
