import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Globals } from '../../configs/globals';
import { AuthorizationService } from '../services/authorization.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private readonly http: HttpClient, public globals: Globals, private auth: AuthorizationService) {
  }

  endpoint = environment.endpoint;

  httpOptions = {
    headers: new HttpHeaders()
  };

  getHttpClient(): HttpClient {
    this.updateHeaders();
    return this.http;
  }

  updateHeaders() {
    this.httpOptions.headers = new HttpHeaders();
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    this.httpOptions.headers = this.httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    this.httpOptions.headers = this.httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', this.auth.getJwtToken());
  }
}
