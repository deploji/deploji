import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../interfaces/inventory';
import { App } from '../interfaces/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  constructor(private http: HttpClient) {
  }

  getInventories(app?: App): Observable<Inventory[]> {
    return this.http.get<Inventory[]>('/api/inventories', { params: app ? { app: app.ID.toString()} : { }})
      .pipe(
        map(inventories => {
          return inventories.map(inventory => {
            inventory.ApplicationInventories.sort(
              (a, b) => a.Application.Name < b.Application.Name ? -1 : 1
            );
            return inventory;
          });
        })
      );
  }

  getInventory(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`/api/inventories/${id}`);
  }

  save(inventory: Inventory): Observable<Inventory> {
    if (inventory.ID) {
      return this.http.put<Inventory>(`/api/inventories/${inventory.ID}`, inventory);
    }
    return this.http.post<Inventory>('/api/inventories', inventory);
  }

  destroy(inventory: Inventory) {
    return this.http.delete(`/api/inventories/${inventory.ID}`);
  }

  getInventoriesByAppID(appID: any): Observable<Inventory[]> {
      return this.http.get<Inventory[]>(`/api/applications/${appID}/inventories`);
  }
}
