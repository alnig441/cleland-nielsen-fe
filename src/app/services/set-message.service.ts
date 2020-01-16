import { Injectable } from "@angular/core";
import { ErrorParser } from "./error-parser";

@Injectable()

export class SetMessageService {

    private message: any = {};
    private state : string = 'hidden';
    private forceLogout: boolean = false;
    private parser = new ErrorParser();

    constructor(
    ) {}

    set(message?: any): any {
            
      message = this.parser.handleError(message);
              
      this.message = {}

      this.message = message;
      this.state = 'visible';
      
      this.forceLogout = message.forceLogout ? message.forceLogout : false;
      let delay = this.forceLogout ? 10000 : 3500 ;

      let httpStatus = parseInt(message.status) ? parseInt(message.status): null;
      this.message.type = httpStatus == null ? 'info': httpStatus < 300 ? 'success': httpStatus < 400 ? 'warning' : 'danger';

      setTimeout(() => {
          this.state = 'hidden';
      },delay)

    }

    get(): any {
      return this.message;
    }

    getState(): string {
      return this.state;
    }

    getForceLogout(): boolean {
      return this.forceLogout;
    }

    cancel(): void {
      this.forceLogout = false;
      this.state = 'hidden';
    }

    clear(): any {
      this.message = {};
    }

}
