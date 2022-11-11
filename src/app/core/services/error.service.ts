import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class ErrorService {

   getClientMessage(error: Error): string {
      if (!navigator.onLine) {
         return 'No Internet Connection';
      }
      return error.message ? error.message : error.message;
   }

   getClientStack(error: Error): string {
      if(error.stack != undefined) {
         return error.stack.toString();
      }
      return 'stack';
   }

   getServerMessage(error: HttpErrorResponse): string {
      return error.message;
   }

   getServerStack(error: HttpErrorResponse): string {
      // handle stack trace
      return 'stack';
   }
}
