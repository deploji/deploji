import { TestBed } from '@angular/core/testing';
import { InventoriesService } from './inventories.service';
import { Inventory } from '../interfaces/inventory';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('InventoriesService', () => {

  const inventories: Inventory[] = [
    {
      ID: 1,
      Name: 'Foo',
      ApplicationInventories: [
        {
          ID: 1,
          Key: {Title: ''},
          KeyID: 1,
          VaultKey: {Title: ''},
          VaultKeyID: 1,
          Application: {Name: 'Foo'},
          Inventory: {Name: ''},
          IsActive: true,
          Playbook: ''
        },
        {
          ID: 2,
          Key: {Title: ''},
          KeyID: 2,
          VaultKey: {Title: ''},
          VaultKeyID: 2,
          Application: {Name: 'Bar'},
          Inventory: {Name: ''},
          IsActive: true,
          Playbook: ''
        },
        {
          ID: 3,
          Key: {Title: ''},
          KeyID: 3,
          VaultKey: {Title: ''},
          VaultKeyID: 3,
          Application: {Name: 'Baz'},
          Inventory: {Name: ''},
          IsActive: true,
          Playbook: ''
        }
      ]
    },
    {
      Name: 'New Inventory',
      ApplicationInventories: []
    }
  ];
  const httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put']);
  httpClientSpy.get.and.returnValues(of(inventories));
  httpClientSpy.post.and.returnValues(of(inventories));
  httpClientSpy.put.and.returnValues(of(inventories));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
  });

  it('should be created', () => {
    const service: InventoriesService = TestBed.inject(InventoriesService);
    expect(service).toBeTruthy();
  });

  it('should sort application inventories', () => {
    const service: InventoriesService = TestBed.inject(InventoriesService);
    service.getInventories().subscribe((response: Inventory[]) => {
      expect(response[0].ApplicationInventories[0].Application.Name).toEqual('Bar');
      expect(response[0].ApplicationInventories[1].Application.Name).toEqual('Baz');
      expect(response[0].ApplicationInventories[2].Application.Name).toEqual('Foo');
    });
  });

  it('should save new inventory using POST', () => {
    const service: InventoriesService = TestBed.inject(InventoriesService);
    service.save(inventories[1]).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });

  it('should save existing inventory using PUT', () => {
    const service: InventoriesService = TestBed.inject(InventoriesService);
    service.save(inventories[0]).subscribe(() => {
      expect(httpClientSpy.put).toHaveBeenCalledWith(`/api/inventories/${inventories[0].ID}`, inventories[0]);
    });
  });
});
