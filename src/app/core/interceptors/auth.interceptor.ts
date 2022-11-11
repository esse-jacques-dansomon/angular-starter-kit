import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {PaysService} from "../../data/services/pays.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(private paysService : PaysService) {}

   intercept(req: HttpRequest<any>,
             next: HttpHandler): Observable<HttpEvent<any>> {
      const idToken = localStorage.getItem("access_token");
      const isApiUrl = req.url.startsWith(environment.apiUrl);
      if (idToken && isApiUrl) {
         const cloned = req.clone({
            headers: req.headers
               .set("Authorization", "Bearer " + idToken)
               .set("countryCode", this.paysService.getPaysFromLocal() ? this.paysService.getPaysFromLocal().code : 'sn')
            //add country to header
         });
         return next.handle(cloned);
      }
      else {
         const cloned2 = req.clone({
            headers: req.headers
               .set("countryCode",this.paysService.getPaysFromLocal() ? this.paysService.getPaysFromLocal().code : 'sn')
            //add country to header
         });
         return next.handle(cloned2);
      }
   }
}
