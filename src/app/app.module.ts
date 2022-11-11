import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GlobalErrorHandler} from "./core/helpers/global-error-handler";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorInterceptor} from "./core/interceptors/error.interceptor";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {CacheInterceptor} from "./core/interceptors/cache.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
