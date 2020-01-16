import { Observable } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";
import { SetMessageService } from "./set-message.service";

export class ErrorParser {

    
    handleError(error: HttpErrorResponse): any {      
        let err = error;

        if(error.status === 200) {
          err = new HttpErrorResponse({
            error: 'HttpErrorResponse',
            status: error.status,
            statusText: `Method Completed Succesfully: ${error.statusText}`
          })
        }

        if (error.status === 401) {
          err = new HttpErrorResponse({
            error: 'HttpErrorResponse',
            status: error.status,
            statusText: `${error.statusText}. Expired Token - Please Login Again`,
          })
        }
        
        if(error.status == 404) {
          err = new HttpErrorResponse({
            error: 'HttpErrorResponse',
            status: error.status,
            statusText: `${error.statusText} or Not Yet Implemented`,
          })
        }
        
        if(error.status == 405) {
          err = new HttpErrorResponse({
            error: 'HttpErrorResponse',
            status: error.status,
            statusText: `Insufficient Permissions: ${error.statusText}`
          })
        }
        
        if(error.status == 504) {
          err = new HttpErrorResponse({
            error: 'HttpErrorResponse',
            status: error.status,
            statusText: `${error.statusText}. Check If The Database Is Running`,
          })
        }
        
        return err;
        // throw err;
    }
}