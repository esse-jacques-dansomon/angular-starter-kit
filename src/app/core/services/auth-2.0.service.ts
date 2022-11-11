import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, finalize, Observable, of, Subscription} from "rxjs";
import {map, tap} from "rxjs/operators"
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../data/LoginResponse";


@Injectable({
   providedIn: 'root'
})
export class Auth20Service {


   private readonly apiUrl = `${environment.apiUrl}api/account`;
   private timer: Subscription;
   private _user = new BehaviorSubject<LoginResponse>(null);
   user$: Observable<LoginResponse> = this._user.asObservable();


   constructor(private router: Router, private http: HttpClient) {
      window.addEventListener('storage', this.storageEventListener.bind(this));
   }

   ngOnDestroy(): void {
      window.removeEventListener('storage', this.storageEventListener.bind(this));
   }


   logout() {
      this.http
         .post<unknown>(`${this.apiUrl}/logout`, {})
         .pipe(
            finalize(() => {
               this.clearLocalStorage();
               this._user.next(null);
               // this.stopTokenTimer();
               this.router.navigate(['login']);
            })
         )
         .subscribe();
   }


   refreshToken(): Observable<LoginResponse | null> {
      console.log("verify")
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
         this.clearLocalStorage();
         return of(null);
      }

      return this.http
         .post<LoginResponse>(`${this.apiUrl}/verify`, { refreshToken })
         .pipe(
            map((x) => {
               this._user.next(x);
               this.setLocalStorage(x);
               this.startTokenTimer();
               return x;
            })
         );
   }


   clearLocalStorage() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.setItem('logout-event', 'logout' + Math.random());
   }


   private stopTokenTimer() {
      this.timer?.unsubscribe();
   }

   private storageEventListener(event: StorageEvent) {
      if (event.storageArea === localStorage) {
         if (event.key === 'logout-event') {
            this._user.next(null);
         }
         if (event.key === 'login-event') {
            location.reload();
         }
      }
   }

   login(username: string, password: string) {
      return this.http
         .post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
         .pipe(
            map((x) => {
               this._user.next(x);
               this.setLocalStorage(x);
               localStorage.setItem('login-event', 'login' + Math.random());
               this.startTokenTimer();
               return x;
            })
         );
   }

   setLocalStorage(x: LoginResponse) {
      localStorage.setItem('access_token', x.access_token);
      localStorage.setItem('refresh_token', x.access_token);
   }

   private getTokenRemainingTime() {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
         return 0;
      }
      const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
      const expires = new Date(jwtToken.exp * 1000);
      return expires.getTime() - Date.now();
   }

   private startTokenTimer() {
      const timeout = this.getTokenRemainingTime();
      this.timer = of(true)
         .pipe(
            delay(timeout),
            tap(() => this.refreshToken().subscribe())
         )
         .subscribe();
   }

}


