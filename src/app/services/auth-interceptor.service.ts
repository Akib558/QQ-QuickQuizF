import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import {LoginService} from './login.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way');
    const token = localStorage.getItem('token');
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && token) {
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }
  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.loginService.getRefreshToken().pipe(
      switchMap((res: any) => {
        console.log('Response from refresh token', res);

        const newToken = res.token;
        localStorage.setItem('token', newToken);
        localStorage.setItem('userID', res.userID);
        console.log('New Token', newToken);

        if (newToken) {
          request = this.addToken(request, newToken);
        }
        return next.handle(request);
      })
    );
  }
}
