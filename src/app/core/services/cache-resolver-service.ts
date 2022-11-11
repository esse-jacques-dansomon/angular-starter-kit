import {Injectable} from "@angular/core";
import {HttpResponse} from "@angular/common/http";

@Injectable({
   providedIn: 'root'
})
export class CacheResolverService {
   // private cache = new Map<string, [Date|null, HttpResponse<any>]>()
   private cache =  window.sessionStorage;
   //cache with cache storage
   private SessionStorage  = window.sessionStorage;
   constructor() { }

   set(key: string, value: HttpResponse<any>, ttl: number| null) {
      if(ttl){
         const expires = new Date();
         expires.setSeconds(expires.getSeconds() + ttl);
         this.cache.setItem(key, [expires, value].toString());
      }else{
         this.cache.setItem(key, [null, value].toString());
      }
   }

   get(key: string): HttpResponse<any>| null {
      const value = this.cache.getItem(key) as unknown as [Date|null, HttpResponse<any>];
      if(!value){
         return null;
      }
      const expires = value[0];
      if(expires && expires < new Date()){
         this.cache.removeItem(key);
         return null;
      }
      return value[1];
   }


}
