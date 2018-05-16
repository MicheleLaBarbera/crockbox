import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  success(title: string, message: string, readOnly = false, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', title: title, text: message, readOnly: readOnly });
  }

  error(title: string, message: string, readOnly = false, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', title: title, text: message, readOnly: readOnly });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
