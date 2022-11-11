import {Vendor} from './../../data/types/Vendor';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {finalize, Observable, tap} from 'rxjs';
import {LoginResponse} from 'src/app/data/types/LoginResponse';
import {environment} from "../../../environments/environment";
import {ConnectedVendorInfo} from "../../data/types/connected-vendor-info";
import {Router} from "@angular/router";
import {Boutique} from 'src/app/data/types/Boutique';
import {ToastrService} from "ngx-toastr";
import {SearchAttributes, SearchResults} from "../../data/types/SearchResults";


@Injectable({
   providedIn: 'root'
})
export class UtilsService {
   protected apiUrl: string = environment.apiUrl;

   constructor(private http: HttpClient, private router: Router,
               private toastr: ToastrService) {
   }

   addProductView(id: number): Observable<any> {
      let url = `${this.apiUrl}` + '/produits/' + id + '/views';
      return this.http.get<any>(url);
   }

   addBoutiqueView(id: number): Observable<any> {
      let url = `${this.apiUrl}` + '/boutiques/' + id + '/increment';
      console.log(url);
      return this.http.get<any>(url);
   }

   subscriteToShop(id: number): Observable<any> {
      let url = `${this.apiUrl}` + '/boutiques/' + id + '/favories';
      return this.http.post<any>(url, {});
   }

   unsubscriteToShop(id: number): Observable<any> {
      let url = `${this.apiUrl}` + '/boutiques/' + id + '/favories';
      return this.http.delete<any>(url);

   }

   getFavoritesShops(): Observable<Boutique[]> {
      let url = `${this.apiUrl}` + '/vendeurs/favories';
      console.log(url);
      return this.http.get<Boutique[]>(url);
   }

   search(attributes: SearchAttributes, page: number): Observable<SearchResults> {
      let url = `${this.apiUrl}` + '/search';
      let params = {
      }
      return this.http.get<SearchResults>(url, {
         params: {
            keyWorld: attributes.keyWorld??'',
            min: attributes.min??'',
            max: attributes.max??'',
            isPromo: attributes.isPromo??'',
            isNew: attributes.isNew??'',
            priceFilter: attributes.priceFilter??'',
            'secteurs[]': attributes.secteurs??[],
            page: page??1,
            pageSize: 36
         }
      });
   }
}
