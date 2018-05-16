import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileService {

  private fileUrl = 'http://localhost/getFiles';
  private setLinkUrl = 'http://localhost/setLink';

  constructor(private http: HttpClient) { }

  public getFiles(username: string): Observable<any> {
    return this.http.post<any>(this.fileUrl, JSON.stringify({username: username}));
  }

  public toggleState(username: string, id: string, state: number): Observable<any> {
    return this.http.post<any>(this.setLinkUrl, JSON.stringify({username: username, hashedId: id, genLink: state}));
  }
}
