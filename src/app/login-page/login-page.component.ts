import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  responseData : any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient, private router: Router) { }
  private baseUrl = 'http://localhost:8888/api/login';
  ngOnInit() {
  }

  signIn(event: Event, signInForm: NgForm) {
    if (signInForm.form.valid) {
      this.http.post(this.baseUrl, signInForm.form.value, this.httpOptions)
        .subscribe(
          response => {
            this.responseData = response;
            if(this.responseData.response.success){
              if (this.responseData.response.role == 1) {
                this.router.navigate(['dashboard']);
              } else {
                this.router.navigate(['profile', this.responseData.response.username]);
              }
            }else{
              alert('Invalid login details');
            }
          },
          error => {
            alert('Error occurred while log in.');
          }
        );
    } else {
      alert('Invalid login details');
    }
  }

  forgotPassword(event: Event, signInForm: NgForm) {
    if (signInForm.form.value.username) {
      alert('Password reset instructions are sent to your registered email Id.');
    } else {
      alert('Please enter username.');
    }
  }
  
  signup(event: Event) {
    this.router.navigate(['signup']);
  }
}
