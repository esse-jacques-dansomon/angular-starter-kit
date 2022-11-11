import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-loader-spinner',
   template: `
      <div *ngIf="isLoading" class=" app-spinner d-flex justify-content-center p-4 ">
         <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
         </div>
      </div>
  `,
   styles: [`
      .app-spinner{
         min-width: 100% !important;
      }
      .sigle-image{
         width: 100%;
      }
   `]
})
export class SniperLoaderComponent {
   @Input()
   isLoading!: boolean;
}
