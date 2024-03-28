import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = 'http://localhost:5122/api/';
  constructor(private http: HttpClient) {}

  loginSubmit(data: any) {
    return this.http.post(this.baseUrl + 'auth/login', data);
  }
  isActive(data: any) {
    console.log('Inside isActive service');

    return this.http.post(this.baseUrl + 'auth/active/' + data, {});
  }

  getRefreshToken(): any {
    console.log('Inside getRefreshToken service');

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userID');
    return this.http.post(
      this.baseUrl + 'auth/refresh-token',
      {
        UserId: userId,
        token: token,
        refreshToken: token,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    // .pipe(
    //   map((res: any) => {
    //     console.log('Refresh Token Response', res);
    //     if (res.token && res.userId) {
    //       localStorage.setItem('token', res.token);
    //       localStorage.setItem('userID', res.userId);
    //     }
    //   })
    // );
  }

  // isActive(data: any) {
  //   return this.http.post(this.baseUrl + 'auth/active/' + data, {});
  // }
  logout(token: string, UserID: string) {
    return this.http.post(this.baseUrl + 'auth/logout/', {
      UserID: UserID,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
