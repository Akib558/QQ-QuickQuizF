import { HomepageService } from './../../services/homepage.service';
import {
  Component,
  OnInit,
  inject,
  TemplateRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { QuizesService } from '../../services/quizes.service';
// import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
export class Pages {
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 2;
  data: any = [];
}

@Component({
  selector: 'app-homepage',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css'],
})
export class QuizesComponent implements OnInit {
  UserID: string = ''; // Initialize the property here
  participants: Pages = new Pages();
  rooms: Pages = new Pages();
  @ViewChild('roomName') roomName!: ElementRef;

  constructor(private quizesService: QuizesService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') ?? '';
    const UserID = localStorage.getItem('userID') ?? '';
    if (token === '') {
      this.router.navigate(['/login']);
    }
    if (this.quizesService.isActive(UserID)) {
      console.log('User is active');
    } else {
      this.router.navigate(['/login']);
    }
    this.getAllParticipants();
    this.getAllRooms();
  }

  showRoom(roomID: number) {
    this.router.navigate(['/roompage'], { queryParams: { roomID: roomID } });
  }
  editRoom(roomID: number) {
    this.router.navigate(['/editroom', roomID]);
  }
  deleteRoom(roomID: number) {
    // this.quizesService.deleteRoom(roomID).subscribe((res: any) => {
    //   console.log(res);
    //   this.getAllRooms();
    // });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    this.router.navigate(['/login']);
  }

  getAllParticipants() {
    this.quizesService
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
    this.quizesService.getAllRooms(this.rooms.page).subscribe((res: any) => {
      console.log(res);
      this.rooms.data = res.data;
      this.rooms.collectionSize = res.pages.totalItems;
      this.rooms.page = res.pages.currentPage;
      this.rooms.pageSize = res.pages.pageSize;
    });
  }

  startQuiz(roomID: number) {
    const UserId = parseInt(localStorage.getItem('userID') ?? '');

    this.quizesService
      .startQuiz({ roomID: roomID, UserID: UserId })
      .subscribe((res: any) => {
        console.log(res);
        this.getAllRooms();
      });
  }
  pauseQuiz(roomID: number) {
    const UserId = parseInt(localStorage.getItem('userID') ?? '');

    this.quizesService
      .pauseQuiz({ roomID: roomID, UserID: UserId })
      .subscribe((res: any) => {
        console.log(res);
        this.getAllRooms();
      });
  }
  endQuiz(roomID: number) {
    const UserId = parseInt(localStorage.getItem('userID') ?? '');
    // UserId = parseInt(UserId);
    this.quizesService
      .endQuiz({ roomID: roomID, UserID: UserId })
      .subscribe((res: any) => {
        console.log(res);
        this.getAllRooms();
      });
  }

  private modalService = inject(NgbModal);
  closeResult = '';

  quizForm = new FormGroup({
    roomName: new FormControl(''),
  });

  gotoQuizWithParticipants() {
    // const value = this.roomName.nativeElement.value;
    // console.log(value);
    // console.log('Entered');
    const roomName = this.quizForm.value.roomName;
    console.log(roomName);
    this.quizForm.reset();
    // this.modalService.close();
    this.router.navigate(['/quizwithparticipants'], {
      queryParams: { roomName: roomName },
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
