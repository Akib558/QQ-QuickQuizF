import { HomepageService } from './../../services/homepage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
// import { Component, OnInit } from '@angular/core';

export class Pages {
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 2;
  data: any = [];
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  UserID: string = ''; // Initialize the property here

  participants: Pages = new Pages();
  rooms: Pages = new Pages();

  constructor(
    private homePageService: HomepageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') ?? '';
    const UserID = localStorage.getItem('userID') ?? '';
    if (token === '') {
      this.router.navigate(['/login']);
    }
    if (this.homePageService.isActive(UserID)) {
      console.log('User is active');
      // localStorage.setItem('userID', this.UserID);
    } else {
      this.router.navigate(['/login']);
    }
    this.getAllParticipants();
    this.getAllRooms();
    // const decodedToken: any = jwtDecode(token);
    // var decodedJson = decodedToken; // Assign decodedToken directly
    // console.log(decodedToken.unique_name); // Access the 'name' property of the decoded token
    // var UserID: number = decodedToken.unique_name;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    this.router.navigate(['/login']);
  }

  getAllParticipants() {
    this.homePageService
      .getAllParticipants(this.participants.page)
      .subscribe((res: any) => {
        console.log(res);
        this.participants.data = res.data;
        this.participants.collectionSize = res.pages.totalItems;
        this.participants.page = res.pages.currentPage;
        this.participants.pageSize = res.pages.pageSize;
      });
  }

  getAllRooms() {
    this.homePageService.getAllRooms(this.rooms.page).subscribe((res: any) => {
      console.log(res);
      this.rooms.data = res.data;
      this.rooms.collectionSize = res.pages.totalItems;
      this.rooms.page = res.pages.currentPage;
      this.rooms.pageSize = res.pages.pageSize;
    });
  }
}
