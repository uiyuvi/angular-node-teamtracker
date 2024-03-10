import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error.error){
          let errmsg:string = error.error.error;
          if(errmsg.localeCompare("Username or password is wrong") == 0 || errmsg.localeCompare("Member with same team already exists") == 0)
            errorMessage = errmsg;
          else if(errmsg.indexOf("duplicate")!=-1)
            errorMessage = "Team name already exists";
        }else if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
          window.alert(errorMessage);
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nStatus Text: ${error.statusText}`;
          window.alert(errorMessage);
        }
        console.error(error);
        return throwError(errorMessage);
      }));
  }
}
