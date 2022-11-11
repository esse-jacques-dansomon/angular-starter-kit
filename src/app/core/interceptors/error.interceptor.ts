import { Injectable } from '@angular/core';
import {
   HttpEvent, HttpRequest, HttpHandler,
   HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import {AuthService} from "../services/AuthService";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   constructor(private authService : AuthService, private router: Router) {
   }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
         retry(0),
         catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
               this.authService.clearLocalStorage();
               this.router.navigate(['/auth/login']);
            } else if (error.status === 403) {
              // alert('403');
            } else if (error.status === 404) {
               this.router.navigate(['/not-found']);
            }
            return throwError(() =>error);
         })
      );
   }
}
