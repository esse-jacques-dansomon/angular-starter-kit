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


@Injectable({
   providedIn: 'root'
})
export class AuthService {
   protected apiUrl: string = environment.apiUrl;



   constructor(private http: HttpClient, private router: Router) { }

   login(email: string, password: string) {

      return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
         tap(
            next => {
               this.setSession(next);
            }
         )
      );
   }

   register(data: any) {
      let body = {
         "name": data.nom,
         "first_name": data.prenom,
         "email": data.login,
         "password": data.password,
         "phone": data.telephone,
         "country": data.codePays,
         "boutique_name": data.nomboutique,
      }
      return this.http.post<LoginResponse>(`${this.apiUrl}/vendeurs`, body).pipe(
         tap(
            next => {
               this.setSession(next);
            },
         )
      );
   }


   private setSession(authResult: LoginResponse) {
      // Set the time that the access token will expire moment
      const expiresAt = moment().add(authResult.expires_in, 'second');
      localStorage.setItem('access_token', authResult.access_token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));

   }

   clearLocalStorage() {
      localStorage.clear();
   }

   logout() {
      this.http
         .post<unknown>(`${this.apiUrl}/auth/logout`, {})
         .pipe(
            finalize(() => {
               this.clearLocalStorage();
               // this.stopTokenTimer();
               this.router.navigate(['/']);
            })
         ).subscribe();
   }

   public isLoggedIn() {
      return moment().isBefore(this.getExpiration()) && localStorage.getItem('access_token') != null;
   }

   isLoggedOut() {
      return !this.isLoggedIn();
   }

   getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration!);
      return moment(expiresAt);
   }

   forgetPassword(email: string) {
      //save email on localStorage
      localStorage.setItem('email_reset', email);
      let response = this.http.post(`${this.apiUrl}/auth/password/forget`, { email });

      return response;
   }
   sendotp(otp: string) {

      let email = localStorage.getItem('email_reset');
      let response = this.http.post(`${this.apiUrl}/auth/password/otp/verif`, { email, otp });

      return response;
   }

   VendorConnected(): ConnectedVendorInfo {
      return (JSON.parse(atob(localStorage.getItem("access_token").split('.')[1]))) as ConnectedVendorInfo;
   }

   vendeurLog(): any  {
      //let vendeur: Vendor = {}
      let url = `${this.apiUrl}` + '/vendeur';
      let vendeur : Vendor ;
      return this.http.get<Observable<Boutique>>(url).subscribe(
         (data) => {
            // vendeur = data['vendeur'] as Vendor;
            // console.log(vendeur);
         }
      );

   }

   updateVendeur(vendeur: any){
      let url = `${this.apiUrl}` + '/vendeur';
      return this.http.post(url, vendeur);

   }
   updatePassword(vendeur: any){
      let url = `${this.apiUrl}` + '/auth/password/update';
      return this.http.post(url, vendeur);
   }


}
