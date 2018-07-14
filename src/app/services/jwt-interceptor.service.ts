import { Injectable} from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";

Injectable()
export class JwtInterceptorService implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let currentUserToken = localStorage.getItem('token');

        if(currentUserToken){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUserToken}`
                }
            });
        }
        console.log('show me interecepted request: ', request.headers);
        return next.handle(request);
    }

}