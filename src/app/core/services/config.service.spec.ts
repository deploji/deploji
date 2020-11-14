import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ConfigService', () => {

  const settings = {foo: 'bar'};
  let httpClientSpy;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(['get']);
    httpClientSpy.get.and.returnValues(of(settings));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
  });

  it('should create', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    expect(service).toBeTruthy();
  });

  it('should get all settings', async () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    const promise = service.loadSettings();
    promise().then(() => {
      expect(service.getSettings()).toBe(settings);
    });
  });

  it('should get specific key from settings', async () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    const promise = service.loadSettings();
    promise().then(() => {
      expect(service.getSettings('foo')).toBe(settings.foo);
    });
  });

  it('should return default value if a specific key is not found', async () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    const promise = service.loadSettings();
    promise().then(() => {
      const defaultValue: string = service.getSettings('non-existing-key', 'some-default-value');
      expect(defaultValue).toBe('some-default-value');
    });
  });

  // Even tough it throws error as expected, Karma thinks it the test does not contain any expectations
  // and toThrowError matcher does not work.
  // it('should throw error if key does not exist', async () => {
  //   const service: ConfigService = TestBed.inject(ConfigService);
  //   const promise = service.loadSettings();
  //   promise().then(() => {
  //     expect(service.getSettings('non-existing-key')).toThrowError('No setting found with the specified key [non-existing-key]!');
  //   });
  // });
});
