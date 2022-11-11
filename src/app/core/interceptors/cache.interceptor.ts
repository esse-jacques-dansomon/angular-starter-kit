import { Injectable } from '@angular/core';
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {CacheResolverService} from "../services/cache-resolver-service";
const TTL = 60*60*24*7; // 1 week
@Injectable()
export class CacheInterceptor implements HttpInterceptor {

   constructor(private cacheResolverService : CacheResolverService) {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      if(request.method !== 'GET' || request.url.includes('auth') ){
         return next.handle(request);
      }
      const cachedResponse = this.cacheResolverService.get(request.urlWithParams);
      return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next);
   }

   sendRequest(request: HttpRequest<any>, next: HttpHandler) {
      return next.handle(request).pipe(
         tap(event => {
            if(event instanceof HttpResponse){
               this.cacheResolverService.set(request.urlWithParams, event, TTL);
            }
         }
      ));
   }
}
