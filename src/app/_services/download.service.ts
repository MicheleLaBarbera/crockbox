import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DownloadService {

  private downloadUrl = 'http://localhost/file/';

  constructor(private http: HttpClient) { }

  public downloadFile(fileID: string): Observable<any> {
    return this.http.get<any>(this.downloadUrl + fileID);
  }

  public downloadUserFile(username: string, fileID: string): Observable<any> {
    return this.http.post<any>(this.downloadUrl + fileID, JSON.stringify({username: username}));
  }
}
