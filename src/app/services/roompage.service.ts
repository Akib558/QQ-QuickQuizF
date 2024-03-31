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
    console.log('Data', data);

    return this.http.put(this.baseUrl + 'setter/room/update', data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAllParticipants(pg: number): Observable<any> {
    const token = localStorage.getItem('token') ?? '';

    return this.http.get(this.baseUrl + 'setter/allparticipants/' + pg, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getRoomParticipants(data: any, pg: number): Observable<any> {
    const token = localStorage.getItem('token') ?? '';

    return this.http.post(
      this.baseUrl + 'setter/room/participants/' + pg,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }

  updateParticipants(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'setter/room/addparticipants', data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
  deleteParticipants(data: any): Observable<any> {
    return this.http.post(
      this.baseUrl + 'setter/room/singleparticipant/delete',
      data,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
  // deleteParticipants(data: any): Observable<any> {
  //   return this.http.post(this.baseUrl + 'setter/room/deleteparticipants', data, {
  //     headers: {
  //       Authorization: 'Bearer ' + localStorage.getItem('token'),
  //     },
  //     }
  //   }
}
