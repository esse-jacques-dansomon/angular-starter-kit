import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {ResourceModel} from "../data/resource-model";


@Injectable({
   providedIn: 'root'
})

export abstract class ResourceService<T extends  ResourceModel<T>> {
   protected   apiUrl : string = environment.apiUrl;
   protected constructor(protected httpClient: HttpClient) {}

   post$ = (uri: string, data: any): Observable<T> => this.httpClient.post<T>( uri, data);

   create$ = (resource: T): Observable<T> => this.httpClient.post<T>(this.apiUrl, resource);

   getById$  = (id: number): Observable<T> => this.httpClient.get<T>(`${this.apiUrl}/${id}`);

   update$  = (resourceModel: T): Observable<T> => this.httpClient.put<T>(`${this.apiUrl}/${resourceModel.id}`, resourceModel);

   getAll$ = (): Observable<T[]> => this.httpClient.get<T[]>(`${this.apiUrl}`);

   delete$ = (id: number): Observable<any> => this.httpClient.delete<any>(`${this.apiUrl}/${id}`);

   getAllByUri$ = (uri: string): Observable<T[]> => this.httpClient.get<T[]>(`${this.apiUrl}/${uri}`);

   getOneByUri$ = (uri: string): Observable<T> => this.httpClient.get<T>(`${this.apiUrl}/${uri}`);

   getBySlug$ = (uri: string): Observable<T> => this.httpClient.get<T>(`${this.apiUrl}/slug/${uri}`);

   getAllByTypeAndUri$ = (uri: string): Observable<any[]> => this.httpClient.get<any[]>(`${this.apiUrl}/${uri}`);

   getOneByTypeAndUri$ = (uri: string): Observable<any> => this.httpClient.get<any>(`${this.apiUrl}/${uri}`);

   getOneByTypeAndUriAndPage$ = (uri: string, page : number, pageSize = '40'): Observable<any> => this.httpClient.get<any>(`${this.apiUrl}/${uri}`,  {params: {page: page.toString(),pageSize: pageSize}});

   getOneByTypeAndPage$ = ( page : number, pageSize = '40'): Observable<any> => this.httpClient.get<any>(`${this.apiUrl}`,  {params: {page: page.toString(),pageSize: pageSize}});

   addOneByTypeAndUri$ = (uri: string, resource: any): Observable<any> => this.httpClient.post<any>(`${this.apiUrl}/${uri}`, resource);

   updateOneByTypeAndUri$ = (uri: string, resource: any): Observable<any> => this.httpClient.put<any>(`${this.apiUrl}${uri}`, resource);
}
