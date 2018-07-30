import { Injectable } from "@angular/core";
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
        return next.handle(request);
    }

}