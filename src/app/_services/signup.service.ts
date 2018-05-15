import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignupService {

  private signupUrl = 'http://localhost/register';

  constructor(private http: HttpClient) { }

  public signup(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.signupUrl, JSON.stringify({username: username, password: password}));
  }

}
