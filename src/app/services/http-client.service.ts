import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { GlobalService } from './global.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  // constructor(private http: HttpClient, private globalSrv: GlobalService) {
  constructor(private readonly http: HttpClient) {
    this.updateHeaders();
  }

  endpoint = environment.endpoint;

  httpOptions = {
    headers: new HttpHeaders(),
    // withCredentials: true,
  };

  getHttpClient(): HttpClient {
    this.updateHeaders();
    return this.http;
  }  

  updateHeaders() {
    this.httpOptions.headers = new HttpHeaders();
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    this.httpOptions.headers = this.httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    this.httpOptions.headers = this.httpOptions.headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");    
    // this.httpOptions.headers = this.httpOptions.headers.append('Authorization', 'Bearer '.concat(this.globalSrv.token));
  }

}
