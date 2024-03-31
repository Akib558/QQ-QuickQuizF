import {
  Component,
  OnInit,
  inject,
  TemplateRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoompageService } from '../../services/roompage.service';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
export class Pages {
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 2;
  data: any = [];
}
@Component({
  selector: 'app-roompage',
  templateUrl: './editroompage.component.html',
  styleUrl: './editroompage.component.scss',
  // imports: [NgbCollapseModule],
})
export class EditRoompageComponent implements OnInit {
  roomId: number = 0;
  roomPage: any = {};
  roomParticipants: any = [];
  participants: Pages = new Pages();
  RoomUpdateForm = new FormGroup({
    RoomName: new FormControl('') ?? '',
    RoomStatus: new FormControl('') ?? '',
    StartTime: new FormControl('') ?? '',
  });
  roomData = {
    roomID: 0,
    roomName: '',
    userID: 0,
    startTime: '',
    roomTypeID: 0,
    roomStatus: 0,
  };

  questionUpdate = {
    questionID: 0,
    question: '',
    options: [],
    answer: 0,
    roomID: 0,
    UserID: 0,
  };

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
    this.getAllParticipants();
    this.getRoomParticipants();
  }
  userID = localStorage.getItem('userID');
  isCollapsed = true;
  isCollapsed2 = true;
  getRoomData() {
    this.roomPageService
      .getRoomData({ RoomID: this.roomId, UserID: this.userID })
      .subscribe(
        (res) => {
          // console.log('Room Data', res);
          this.roomPage = res;
          this.RoomUpdateForm.patchValue({
            RoomName: res.data.roomName,
            RoomStatus: res.data.roomStatus,
            StartTime: res.data.startTime,
          });
          this.roomData.roomID = res.data.roomID;
          this.roomData.roomName = res.data.roomName;
          this.roomData.userID = res.data.userID;
          this.roomData.startTime = res.data.startTime;
          this.roomData.roomTypeID = res.data.roomTypeID ?? 1;
          this.roomData.roomStatus = res.data.roomStatus;
          // this.RoomUpdateForm.value.RoomName = res.data.roomName;
          // console.log('Room Page', this.roomPage);
        },
        (err) => {
          console.log('Error', err);
        }
      );
  }

  updateRoom() {
    this.roomData.roomName = this.RoomUpdateForm.value.RoomName ?? '';
    this.roomData.roomStatus =
      Number(this.RoomUpdateForm.value.RoomStatus) ?? '';
    this.roomData.startTime = this.RoomUpdateForm.value.StartTime ?? '';
    console.log('Room Data', this.roomData);
    this.roomPageService.updateRoom(this.roomData).subscribe((res) => {
      console.log('Update Room', res);
      this.getRoomData();
    });
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

  getRoomParticipants() {
    this.roomPageService
      .getRoomParticipants(
        { RoomID: this.roomId, UserID: this.userID },
        this.participants.page
      )
      .subscribe((res: any) => {
        console.log(res);
        this.roomParticipants = res.data;
        console.log('RoomParticipants are: ', this.roomParticipants);
      });
  }

  getAllParticipants() {
    this.roomPageService
      .getAllParticipants(this.participants.page)
      .subscribe((res: any) => {
        console.log(res);
        this.participants.data = res.data;
        this.participants.collectionSize = res.pages.totalItems;
        this.participants.page = res.pages.currentPage;
        this.participants.pageSize = res.pages.pageSize;
      });
  }

  toggleParticipants(id: number) {
    console.log('ID', id);
    console.log(this.roomParticipants.includes(id));

    if (this.roomParticipants.includes(id)) {
      this.deleteParticipants(id);
      this.roomParticipants = this.roomParticipants.filter(
        (item: any) => item !== id
      );
    } else {
      this.updateParticipants(id);
      this.roomParticipants.push(id);
    }
    console.log('Room Participants', this.roomParticipants);
  }

  //   {
  //     "roomID": 1,
  //     "UserID": 1,
  //     "Participants": [
  //         3,
  //         5,
  //         1001

  //     ]
  // }

  updateParticipants(id: number) {
    console.log('Room Participants', this.roomParticipants);
    this.roomPageService
      .updateParticipants({
        roomID: this.roomId,
        UserID: this.userID,
        Participants: [id],
      })
      .subscribe((res: any) => {
        console.log('Update Participants', res);
        this.getRoomParticipants();
      });
  }

  deleteParticipants(id: number) {
    console.log('ID', id);
    this.roomPageService
      .deleteParticipants({
        roomID: this.roomId,
        userID: this.userID,
        participantID: id,
      })
      .subscribe((res: any) => {
        console.log('Delete Participants', res);
        this.getRoomParticipants();
      });
  }
  private modalService = inject(NgbModal);
  closeResult = '';

  quizForm = new FormGroup({
    roomName: new FormControl(''),
  });
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
