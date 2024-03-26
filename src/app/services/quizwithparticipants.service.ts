import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizwithparticipantsService {
  baseUrl: string = 'http://localhost:5122/api/';

  constructor(private http: HttpClient) {}

  isActive(data: any) {
    return this.http.post(this.baseUrl + 'auth/active/' + data, {});
  }

  getAllParticipants(pg: number): Observable<any> {
    console.log('Getting all participants serivice');

    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http.get(this.baseUrl + 'setter/allparticipants/' + pg, {
      headers: headers,
    });
  }

  createRoom(data: any, roomName: string): Observable<any> {
    console.log('Creating room service');
    const token = localStorage.getItem('token') ?? '';
    const userID = localStorage.getItem('userID') ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(
      this.baseUrl + 'setter/room/create',
      {
        roomName: roomName,
        UserID: userID,
        Participants: data,
      },
      {
        headers: headers,
      }
    );
  }

  deleteRoom(roomID: number): Observable<any> {
    console.log('Deleting room service');
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.delete(this.baseUrl + 'setter/room/delete/' + roomID, {
      headers: headers,
    });
  }
}
