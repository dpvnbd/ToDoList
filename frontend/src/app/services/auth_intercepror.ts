import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Angular2TokenService} from "angular2-token";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // angular2-token package uses deprecated Http service
  // so we add the interceptor and manually set auth headers
  // to use new HttpClient
  constructor(private auth: Angular2TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authData = this.auth.currentAuthData;

    let headers = req.headers;
    headers = headers.set('access-token', authData.accessToken);
    headers = headers.set('token-type', authData.tokenType);
    headers = headers.set('client', authData.client);
    headers = headers.set('expiry', authData.expiry);
    headers = headers.set('uid', authData.uid);

    // Clone the request to add the new header.
    const authReq = req.clone({headers: headers});

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
