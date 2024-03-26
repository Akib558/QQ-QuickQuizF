import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HomepageComponent } from '../homepage/homepage.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [NgbNavModule],
  standalone: true,
})
export class NavbarComponent {
  active = 1;

  constructor(private loginService: LoginService, private router: Router) {}
  Logout() {
    const token = localStorage.getItem('token') ?? '';
    const UserID = localStorage.getItem('userID') ?? '';

    if (this.loginService.logout(token, UserID)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      this.router.navigate(['/login']);
    } else {
      console.log('User is not active');
    }
  }
}
