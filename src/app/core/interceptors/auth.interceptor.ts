import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, filter, finalize, flatMap, map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = this.applyToken(req);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
      }),
      catchError((error: any) => {
        if (error.status === 401) {
          if (req.url.indexOf('refresh') !== -1) {
            this.auth.logout();
            return throwError('');
          }
          if (this.isRefreshingToken) {
            return this.tokenSubject.pipe(
              filter(token => token != null),
              take(1),
              switchMap(() => {
                return next.handle(this.applyToken(request));
              })
            );
          }
          this.isRefreshingToken = true;
          return this.auth.refreshToken().pipe(
            flatMap(() => {
              this.tokenSubject.next(this.auth.tokenString);
              return next.handle(this.applyToken(request));
            }),
            catchError(() => {
              this.auth.logout();
              return throwError('');
            }),
            finalize(() => {
              this.isRefreshingToken = false;
            })
          );
        }
        throwError(error);
      })
    );
  }

  private applyToken(req: HttpRequest<any>) {
    return req.clone({headers: req.headers.set('Authorization', `Bearer ${this.auth.tokenString}`)});
  }
}
