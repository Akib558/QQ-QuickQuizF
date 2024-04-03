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
  inputValue: string = '';
  updateQuestionAnswer: number = 0;
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
    options: [{ option: '', optionID: 0 }],
    answer: 0,
    roomID: 0,
    UserID: 0,
  };

  addQuestion = {
    question: '',
    questionID: 0,
    options: [] as string[],
    answer: 0,
    roomID: 0,
  };

  addQuestionObject = {
    roomID: this.roomId,
    userID: Number(localStorage.getItem('userID')),
    Questions: [this.addQuestion],
  };

  questionOptionInputStatus: any = [];

  questionInfo: Pages = new Pages();
  questionEditForm = new FormGroup({
    questionName: new FormControl(''),
    questionOptions: new FormControl([]),
    // startTime: new FormControl(''),
  });

  questionAddForm = new FormGroup({
    addQuestionName: new FormControl(''),
    questionOptions: new FormControl([]),
    // startTime: new FormControl(''),
  });

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

  private modalService = inject(NgbModal);
  closeResult = '';

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

  changequestionOptionInputStatus(index: number) {
    this.questionOptionInputStatus[index] =
      !this.questionOptionInputStatus[index];
  }

  addOption(optionvalue: HTMLInputElement) {
    this.addQuestion.options.push(optionvalue.value);
    console.log('Add Question', this.addQuestion);
    optionvalue.value = '';
  }

  updateAddQuestionOption(index: number, value: string) {
    this.addQuestion.options[index] = value;
    console.log('Add Question', this.addQuestion);
  }

  loadAddQuestion() {}

  addQuestionFunction() {
    // this.addQuestionObject.Questions.push(this.addQuestion);
    console.log('Question: ', this.questionAddForm.value.addQuestionName);
    this.addQuestion.answer = Number(this.inputValue);
    this.addQuestion.question =
      this.questionAddForm.value.addQuestionName ?? '';

    this.addQuestionObject.roomID = this.roomId;
    console.log('Add Question Object', this.addQuestionObject);
    this.roomPageService
      .addQuestion(this.addQuestionObject)
      .subscribe((res) => {
        console.log('Add Question', res);
        this.getQuestions();
      });
  }

  loadQuestionValue(question: any) {
    this.questionUpdate.questionID = question.questionID;
    this.questionUpdate.question = question.question;
    this.questionUpdate.options = question.options;
    this.questionUpdate.answer = question.answer;
    this.questionUpdate.roomID = this.roomId;
    this.questionUpdate.UserID = Number(localStorage.getItem('userID'));

    this.questionOptionInputStatus = new Array(
      this.questionUpdate.options.length
    ).fill(false);

    this.questionEditForm.patchValue({
      questionName: question.question,
    });
    console.log('Question Update', this.questionUpdate);
  }

  updateQuestion() {
    this.questionUpdate.question =
      this.questionEditForm.value.questionName ?? '';
    console.log('Question Update', this.questionUpdate);
    console.log('Page: ', this.questionInfo.page);
    this.questionUpdate.answer = this.updateQuestionAnswer;
    this.roomPageService.updateQuestion(this.questionUpdate).subscribe(
      (res) => {
        console.log('Update Question', res);
        // console.log();

        this.getQuestions();
      },
      (err) => {
        console.log('Error', err);
      }
    );
  }

  updateOption(index: number, value: string) {
    // console.log('Index', index);

    this.questionUpdate.options[index].option = value;
    console.log('Options', this.questionUpdate.options[index]);
    // console.log('Question Update', this.questionUpdate);
  }

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
        this.getAllParticipants();
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
