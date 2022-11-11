import {SniperLoaderComponent} from "./components/sniper-loader.component";
import {AlertMessageComponent} from "./components/alert-messaga.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactVendorComponent} from "./components/contact-vendor.component";


@NgModule({
   declarations: [
      SniperLoaderComponent,
      AlertMessageComponent,
      ContactVendorComponent

   ],
    exports: [
        SniperLoaderComponent,
       AlertMessageComponent
    ],
   imports: [
      CommonModule,
   ]
})
export class SharedModule { }
