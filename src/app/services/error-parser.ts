import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse, HttpResponseBase } from "@angular/common/http";
// import { AppAlertsServices } from "./app-alerts.services";

export class ErrorParser {

    
    handleError(error: HttpResponseBase): any {      
        let err = error;

        if(error.status === 200) {
          err = new HttpResponse({
            statusText: `Method Completed Succesfully: ${error.statusText}`
          })
        }

        if (error.status === 401) {
          err = new HttpErrorResponse({
            status: error.status,
            statusText: `${error.statusText}. Expired Token - Please Login Again`,
          })
        }
        
        if(error.status == 403) {
          err = new HttpErrorResponse({
            status: error.status,
            statusText: `Insufficient Permissions: ${error.statusText}`
          })
        }
        
        if(error.status == 404) {
          err = new HttpErrorResponse({
            status: error.status,
            statusText: `${error.statusText} or Not Yet Implemented`,
          })
        }
        
        if(error.status == 504) {
          err = new HttpErrorResponse({
            status: error.status,
            statusText: `${error.statusText}. Check If The Database Is Running`,
          })
        }
        
        return err;
    }
}