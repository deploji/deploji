import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private settings: any;

  constructor(private http: HttpClient) {
  }

  loadSettings() {
    return () => this.http.get('/api/front-settings').pipe(
      tap(settings => {
        this.settings = settings;
      })
    ).toPromise();
  }

  getSettings<T = any>(key?: string | Array<string>, defaultValue?: any): T {
    if (!key || (Array.isArray(key) && !key[0])) {
      return this.settings;
    }

    const paths = !Array.isArray(key) ? key.split('.') : key;

    let result = paths.reduce((acc: any, current: string) => acc && acc[current], this.settings);

    if (result === undefined) {
      result = defaultValue;

      if (result === undefined) {
        throw new Error(`No setting found with the specified key [${paths.join('/')}]!`);
      }
    }

    return result;
  }
}
