import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  private uploadAnonUrl = 'http://localhost/uploadAnonymously';
  private uploadUserUrl = 'http://localhost/upload';

  constructor(private http: HttpClient) { }

  public uploadAnon(fileName: string, fileExtension: string, fileContent: any, fileSize: number): Observable<any> {
    return this.http.post<any>(this.uploadAnonUrl, JSON.stringify({fileName: fileName, fileExtension: fileExtension, fileContent: fileContent, fileSize: fileSize}));
  }

  public uploadUser(username: string, fileName: string, fileExtension: string, fileContent: any, fileSize: number): Observable<any> {
    return this.http.post<any>(this.uploadUserUrl, JSON.stringify({username: username, fileName: fileName, fileExtension: fileExtension, fileContent: fileContent, fileSize: fileSize}));
  }
}
