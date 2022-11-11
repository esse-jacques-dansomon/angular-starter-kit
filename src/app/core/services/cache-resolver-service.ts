import {Injectable} from "@angular/core";
import {HttpResponse} from "@angular/common/http";

@Injectable({
   providedIn: 'root'
})
export class CacheResolverService {
   private cache = new Map<string, [Date|null, HttpResponse<any>]>();
   constructor() { }

   set(key: string, value: HttpResponse<any>, ttl: number| null) {
      if(ttl){
         const expires = new Date();
         expires.setSeconds(expires.getSeconds() + ttl);
         this.cache.set(key, [expires, value]);
      }else{
         this.cache.set(key, [null, value]);
      }
   }

   get(key: string): HttpResponse<any>| null {
      const value = this.cache.get(key);
      if(!value){
         return null;
      }
      const expires = value[0];
      if(expires && expires < new Date()){
         this.cache.delete(key);
         return null;
      }
      return value[1];
   }


}
