import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizesService {
  baseUrl: string = 'http://localhost:5122/api/';

  constructor(private http: HttpClient) {}

  isActive(data: any) {
    return this.http.post(this.baseUrl + 'auth/active/' + data, {});
  }

  getAllParticipants(pg: number): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http.get(this.baseUrl + 'setter/allparticipants/' + pg, {
      headers: headers,
    });
  }

  getAllRooms(pg: number): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json', // Set content type to JSON
    });
    // const body = new FormData();
    console.log("GETALLROOMS");
    
    const UserID = localStorage.getItem('userID') ?? '';
    const body = {
      UserID: UserID,
    };
    console.log(UserID);

    return this.http.post(this.baseUrl + 'setter/myrooms/' + pg, body, {
      headers: headers,
    });
  }

  startQuiz(data: any): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json', // Set content type to JSON
    });
    return this.http.post(
      this.baseUrl + 'setter/room/start',
      {
        roomID: data.roomID,
        UserID: data.UserID,
      },
      {
        headers: headers,
      }
    );
  }

  pauseQuiz(data: any): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json', // Set content type to JSON
    });
    return this.http.post(
      this.baseUrl + 'setter/room/pause',
      {
        roomID: data.roomID,
        UserID: data.UserID,
      },
      {
        headers: headers,
      }
    );
  }

  endQuiz(data: any): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json', // Set content type to JSON
    });
    return this.http.post(
      this.baseUrl + 'setter/room/stop',
      {
        roomID: data.roomID,
        // UserID: data.UserID,
      },
      {
        headers: headers,
      }
    );
  }
}
