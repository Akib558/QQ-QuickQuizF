import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoompageService } from '../../services/roompage.service';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
export class Pages {
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 2;
  data: any = [];
}
@Component({
  selector: 'app-roompage',
  templateUrl: './roompage.component.html',
  styleUrl: './roompage.component.css',
  // imports: [NgbCollapseModule],
})
export class RoompageComponent implements OnInit {
  roomId: number = 0;

  roomPage: any = {};

  questionInfo: Pages = new Pages();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomPageService: RoompageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.roomId = params['roomID'];
      console.log(this.roomId);
    });
    this.getRoomData();
    this.getQuestions();
  }
  userID = localStorage.getItem('userID');
  isCollapsed = true;
  isCollapsed2 = true;
  getRoomData() {
    this.roomPageService
      .getRoomData({ RoomID: this.roomId, UserID: this.userID })
      .subscribe(
        (res) => {
          console.log('Room Data', res);
          this.roomPage = res;
          console.log('Room Page', this.roomPage);
        },
        (err) => {
          console.log('Error', err);
        }
      );
  }

  getQuestions() {
    this.roomPageService
      .getQuestions(
        { RoomID: this.roomId, UserID: this.userID },
        this.questionInfo.page
      )
      .subscribe(
        (res) => {
          console.log('Questions', res);
          this.questionInfo.data = res.data;
          this.questionInfo.collectionSize = res.pages.totalItems;
          this.questionInfo.page = res.pages.currentPage;
          this.questionInfo.pageSize = res.pages.pageSize;
        },
        (err) => {
          console.log('Error', err);
        }
      );
  }
}
