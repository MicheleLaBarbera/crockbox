import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  private uploadAnonUrl = 'http://localhost/upload_anon';

  constructor(private http: HttpClient) { }

  public uploadAnon(fileName: string, fileExtension: string, fileContent: any): Observable<any> {
    return this.http.post<any>(this.uploadAnonUrl, JSON.stringify({fileName: fileName, fileExtension: fileExtension, fileContent: fileContent}));
  }

}
