import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable()
export class AuthInterceprot implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('Login');
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bar ${idToken}`)
        });
        return next.handle(authReq)

    }
}