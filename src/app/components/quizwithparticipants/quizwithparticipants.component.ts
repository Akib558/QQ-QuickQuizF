import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizwithparticipantsService } from '../../services/quizwithparticipants.service';
import { FormControl, FormGroup } from '@angular/forms';

export class Pages {
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 2;
  data: any = [];
}
@Component({
  selector: 'app-quizwithparticipants',
  templateUrl: './quizwithparticipants.component.html',
  styleUrls: ['./quizwithparticipants.component.css'],
})
export class QuizwithparticipantsComponent implements OnInit {
  roomName: string = '';
  participants: Pages = new Pages();
  roomCreate = new FormGroup({
    roomName: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizWithParticipantsService: QuizwithparticipantsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.roomName = params['roomName'];
      console.log(this.roomName);
      this.roomCreate.setValue({ roomName: this.roomName });
    });
    this.getAllParticipants();
  }

  getAllParticipants() {
    this.quizWithParticipantsService
      .getAllParticipants(this.participants.page)
      .subscribe((res: any) => {
        console.log(res);
        this.participants.data = res.data;
        this.participants.collectionSize = res.pages.totalItems;
        this.participants.page = res.pages.currentPage;
        this.participants.pageSize = res.pages.pageSize;
      });
  }

  selectedUsers: number[] = [];

  onCheckboxChange(event: any, id: number) {
    if (this.selectedUsers.includes(id)) {
      this.selectedUsers = this.selectedUsers.filter((i) => i !== id);
    } else {
      this.selectedUsers.push(id);
    }
    console.log(this.selectedUsers);
  }

  getStatusOfSelection(id: number) {
    return this.selectedUsers.includes(id);
  }

  createQuiz() {
    console.log(this.selectedUsers);
    this.quizWithParticipantsService
      .createRoom(this.selectedUsers, this.roomName)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          this.router.navigate(['/quizes']);
        }
      });
  }
}
