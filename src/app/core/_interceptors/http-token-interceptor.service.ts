import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

  const TOKEN = 'Authorization';
  @Injectable({
    providedIn: 'root'
  })
  export class HttpTokenInterceptor implements HttpInterceptor {
    userToken: string;
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // this.userToken = localStorage.getItem('ACCESS_TOKEN');
      // if (!request.headers.has(TOKEN) && this.userToken) {
      //   request = request.clone({
      //     setHeaders: {
      //       'Authorization': `${'Bearer '}${this.userToken}`
      //     }
      //   });
      // }
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));
    }


  }
