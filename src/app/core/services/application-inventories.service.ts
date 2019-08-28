import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationInventory } from '../interfaces/application-inventory';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInventoriesService {

  constructor(private http: HttpClient) {
  }

  destroy(inventory: ApplicationInventory) {
    return this.http.delete(`/api/application-inventories/${inventory.ID}`);
  }
}
