import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}
 
@Injectable({
  providedIn: 'root'
})
export class UserService implements HttpInterceptor {


  url = 'https://www.mishnmash.de:444';
  apiKey = ''; // <-- Enter your own key here!
  token = '';
   
  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient, private storage: Storage) { 
    this.storage.get('token').then((val) => {
        this.token = val
        console.log(this.token)
      });
  }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({ setHeaders: { 'Content-Type': 'application/json',
'Access-Control-Allow-Headers': 'Accept', Authorization: 'Bearer '+this.token } });


    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
  	login(credentials: object): Observable<any> {
      const url = `${this.url}/auth/login`;

      return this.http.post(url, credentials);
    }

    getPlants(){
      return this.http.get(`${this.url}/plant/all`);
      
    }

    getActionTypes(){
      return this.http.get(`${this.url}/actiontype/all`);

    }

    getEscalationProfile(nplantId){
      return this.http.get(`${this.url}/escprofile/${nplantId}`);

    }



    getUsers(){
      return this.http.get(`${this.url}/users/all`);
    }

    addAction(data: object): Observable<any> {
      const url = `${this.url}/action/add`;

      return this.http.post(url, data);
    }
}
