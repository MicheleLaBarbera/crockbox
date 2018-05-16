import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SigninService {

  private signinUrl = 'http://localhost/login';

  constructor(private http: HttpClient) { }

  public signin(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.signinUrl, JSON.stringify({ username: username, password: password }))
    .map((response: HttpResponse<any>) => {
      console.log(response.body.username);
      if(response.status == 200) {
        localStorage.setItem('currentUser', JSON.stringify({ username: response.body.username }));
      }
      return response;
    });
  }

  public logout() {
    localStorage.removeItem('currentUser');
  }
}
