import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
