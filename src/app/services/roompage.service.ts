import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoompageService {
  baseUrl: string = 'http://localhost:5122/api/';

  constructor(private http: HttpClient) {}

  getRoomData(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'setter/myroom', data);
  }

  getQuestions(data: any, pg: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(this.baseUrl + 'setter/room/questions/' + pg, data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
  updateRoom(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'setter/updateroom', data);
  }
}
