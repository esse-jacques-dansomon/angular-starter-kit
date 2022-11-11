import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Injectable({
   providedIn: 'root'
})
export class UtilsService {
   protected apiUrl: string = environment.apiUrl;


}
