import { TestBed } from '@angular/core/testing';
import { AppsService } from './apps.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { App } from '../interfaces/app';
import { of } from 'rxjs';

describe('AppsService', () => {
  const fakeApps: App[] = [
    {
      Inventories: [
        {
          ID: 1, Key: null, KeyID: 1, VaultKey: null, VaultKeyID: 1, Application: null,
          Inventory: {Name: 'Foo'}, IsActive: false, Playbook: 'Foo', Name: 'Foo'
        },
        {
          ID: 2, Key: null, KeyID: 2, VaultKey: null, VaultKeyID: 2, Application: null,
          Inventory: {Name: 'Bar'}, IsActive: false, Playbook: 'Foo', Name: 'Bar'
        },
        {
          ID: 3, Key: null, KeyID: 3, VaultKey: null, VaultKeyID: 2, Application: null,
          Inventory: {Name: 'Baz'}, IsActive: false, Playbook: 'Foo', Name: 'Baz'
        }
      ],
    },
    {
      ID: 1,
      Inventories: []
    }
  ];

  const httpSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put']);
  httpSpy.get.and.returnValue(of(fakeApps));
  httpSpy.post.and.returnValue(of(fakeApps));
  httpSpy.put.and.returnValue(of(fakeApps));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      {provide: HttpClient, useValue: httpSpy}
    ]
  }));

  it('should be created', () => {
    const service: AppsService = TestBed.inject(AppsService);
    expect(service).toBeTruthy();
  });

  it('should sort inventories of apps', async () => {
    const service: AppsService = TestBed.inject(AppsService);
    service.getApps().subscribe((apps: App[]) => {
      expect(apps[0].Inventories[0].Name).toEqual('Bar');
      expect(apps[0].Inventories[1].Name).toEqual('Baz');
      expect(apps[0].Inventories[2].Name).toEqual('Foo');
    });
  });

  it('should save using POST', async() => {
    const service: AppsService = TestBed.inject(AppsService);
    service.save(fakeApps[0]).subscribe(() => {
      expect(httpSpy.post).toHaveBeenCalled();
    });
  });

  it('should save using PUT', async() => {
    const service: AppsService = TestBed.inject(AppsService);
    service.save(fakeApps[1]).subscribe(() => {
      expect(httpSpy.put).toHaveBeenCalledWith(`/api/applications/${fakeApps[1].ID}`, fakeApps[1]);
    });
  });
});
