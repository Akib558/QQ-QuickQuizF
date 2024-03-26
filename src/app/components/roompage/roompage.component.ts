import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoompageService } from '../../services/roompage.service';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roompage',
  templateUrl: './roompage.component.html',
  styleUrl: './roompage.component.css',
  // imports: [NgbCollapseModule],
})
export class RoompageComponent implements OnInit {
  roomId: number = 0;

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
  }

  isCollapsed = false;
}
