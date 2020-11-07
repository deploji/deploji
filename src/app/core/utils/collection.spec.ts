import { Collection } from './collection';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

describe('Collection', () => {

  const data = [1, 2, 3];
  const headers = (new HttpHeaders()).append('x-total-count', JSON.stringify(data.length));
  const params = {body: data, headers};
  const response = new HttpResponse<number[]>(params);
  const collection = new Collection(response);

  it('should instantiate', () => {
    expect(collection).toBeTruthy();
  });

  it('should have items from the body response', () => {
    expect(collection.items).toBe(data);
  });

  it('should count the items based on x-total-count header', () => {
    expect(collection.totalCount).toBeGreaterThanOrEqual(3);
    expect(collection.totalCount).toBeLessThanOrEqual(3);
  });
});
