import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginSubmit } from '../../Models/loginSubmit.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  public loginValid = true;

  loginForm = new FormGroup({
    username: new FormControl('') ?? '',
    password: new FormControl('') ?? '',
  });

  loginSubmitModel: LoginSubmit = {
    username: this.loginForm.value.username ?? '',
    password: this.loginForm.value.password ?? '',
  };
  ngOnInit(): void {
    const token = localStorage.getItem('token') ?? '';
    const UserID = localStorage.getItem('userID') ?? '';
    console.log('Token is ' + token + ' and UserID is ' + UserID);

    if (UserID !== '') {
      var activeStatus = this.loginService
        .isActive(UserID)
        .subscribe((res: any) => {
          console.log('Inside subscribe');
        });
      console.log('Active status is ' + activeStatus);

      if (activeStatus) {
        this.router.navigate(['/quizes']);
      }
    }
  }
  loginSubmit() {
    console.log(this.loginForm.value);
    this.loginSubmitModel.username = this.loginForm.value.username ?? '';
    this.loginSubmitModel.password = this.loginForm.value.password ?? '';
    this.loginService
      .loginSubmit(this.loginSubmitModel)
      .subscribe((res: any) => {
        this.loginValid = true;
        console.log(res);
        this.loginForm.reset();
        localStorage.setItem('token', res.token);
        localStorage.setItem('userID', res.userID); // Access userID property of the response object
        // console.log(localStorage.getItem('userID'));
        this.router.navigate(['/home']);
      });
  }
}
