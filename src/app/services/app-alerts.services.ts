import { Injectable } from "@angular/core";
import { ErrorParser } from "./error-parser";

import { BehaviorSubject } from 'rxjs';


@Injectable()

export class AppAlertsServices {

    private message: any = { type: undefined, status: undefined };
    private forceLogout: boolean = false;
    private parser = new ErrorParser();

    private messageSubject = new BehaviorSubject(this.message);
    onUpdatedMessage = this.messageSubject.asObservable();

    private forceLogoutSubject = new BehaviorSubject(this.forceLogout);
    onForceLogout = this.forceLogoutSubject.asObservable();

    constructor(
    ) {}

    set(message?: any): any {
      message = this.parser.handleError(message);

      let httpStatus = parseInt(message.status) ? parseInt(message.status): null;
      let delay = 3500;

      this.message = {}

      this.message = message;

      if (message.forceLogout) {
        this.forceLogout = true;
        delay = 10000;
        this.message.type = 'danger';
        this.message.status = 'Inactivity Alert!';
      } else {
        this.message.type = httpStatus == null ? 'info': httpStatus < 300 ? 'success': httpStatus < 400 ? 'warning' : 'danger';
      }

      this.messageSubject.next(this.message);

    }

    setForceLogout(): void {
      this.forceLogoutSubject.next(true);
    }

    clear(): any {
      this.message = { type: undefined , status: undefined };
      this.forceLogout = false;
      this.messageSubject.next(this.message);
    }

}
