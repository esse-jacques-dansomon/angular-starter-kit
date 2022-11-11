import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {


   constructor() { }

   logError(message: string, stack: string) {
      // this.slackService.postErrorOnSlack(message, stack);
   }
}
