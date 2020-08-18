import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { GIT_CONFIG, API_MAPPING } from '../config';

@Injectable({
  providedIn: 'root'
})
export class GitApiService {

  constructor(
    private http: HttpClient
  ) { }

  getApi(apiKey: string, data?: any) {
    let api = GIT_CONFIG.baseUrl+API_MAPPING[apiKey];
    if(api && data) {
      for(let key in data) {
        api = api.replace(key, data[key]);
      }
    }
    return api;
  }

  getHeaders() {
    return new HttpHeaders({
      Authorization: `token ${GIT_CONFIG.token}`
    })
  }

  makeGetApiCall(apiKey: string, data?: any) {
    let api = this.getApi(apiKey, data);
    if(api) {
      let params = data.params || {};
      return this.http.get(api, {
        headers: this.getHeaders(),
        params: params
      });
    }else {
      console.error(`[makeGetApiCall]:: API should not be null or undefined`);
      return of(null);
    }
  }

  makePutApiCall(apiKey: string, postdata: any, data?: any) {
    let api = this.getApi(apiKey, data);
    if(api) {
      let params = data.params || {};
      return this.http.put(api, postdata, {
        headers: this.getHeaders(),
        params: params
      });
    }else {
      console.error(`[makePutApiCall]:: API should not be null or undefined`);
      return of(null);
    }
  }

  makeDeleteApiCall(apiKey: string, options?: any) {
    let api = this.getApi(apiKey, options);
    if(api) {
      let params = options.params || {};
      return this.http.delete(api, {
        headers: this.getHeaders(),
        params: params
      });
    }else {
      console.error(`[makeDeleteApiCall]:: API should not be null or undefined`);
      return of(null);
    }
  }

  makePostApiCall() {

  }

}
