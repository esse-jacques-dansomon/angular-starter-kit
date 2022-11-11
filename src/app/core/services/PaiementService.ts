import { tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ExclusiveReponse } from 'src/app/data/types/ExclusiveReponse';


@Injectable({
   providedIn: 'root'
 })
 export class PaiementService{
   protected   apiUrl : string = environment.apiUrl;

   constructor(private http: HttpClient) { }

   becomeExlusive(){

      return this.http.post<ExclusiveReponse>(`${this.apiUrl}/exclusive`, {}).pipe(
         tap(
            next => {
               console.log(next);
            }
         )
      );
   }

   doAbonnement(plan_id:number){

         return this.http.post<ExclusiveReponse>(`${this.apiUrl}/abonnement`, {plan_id}).pipe(
            tap(
               next => {
                  console.log(next);
               }
            )
         );
   }

   boostProduct(produit_id:number){

       let body = {
            produit_id : produit_id
       }
         return this.http.post<ExclusiveReponse>(`${this.apiUrl}/paiement/booster`, body).pipe(
            tap(
               next => {
                  console.log(next);
               }
            )
         );
   }
 }
