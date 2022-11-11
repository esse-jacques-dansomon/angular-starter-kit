import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WithLoadingPipe} from "./pipes/with-loading.pipe";



@NgModule({
   declarations: [
      WithLoadingPipe
   ],
   exports: [
      WithLoadingPipe
   ],
   imports: [
      CommonModule
   ]
})

export class CoreModule {}
