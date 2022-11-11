import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-alert-message',
   template: `
      <div class="container mt-2">
         <div class="row">
            <div class="col-12">
               <div class="alert alert-{{type ?? 'warning'}}" role="alert">
                  {{message}}
               </div>
            </div>
         </div>
      </div>
  `,
})
export class AlertMessageComponent {
   @Input()
   message: string;
   @Input()
   type : 'warning' | 'danger' | 'success' | 'info';
}
