import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  responseData : any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private router: Router, private http: HttpClient) { }
  private baseUrl = 'http://localhost:8888/api/signup';
  ngOnInit() { }

  signUp(event: Event, signUpForm: NgForm) {
    if (signUpForm.form.valid) {
      if (signUpForm.form.value.password !== signUpForm.form.value.confirmPassword) {
        alert('Password and confirm password should be same.');
      }
      this.http.post(this.baseUrl,signUpForm.form.value, this.httpOptions)
        .subscribe(
          response => {
            this.responseData = response;
            if (this.responseData.response.success) {
              alert(this.responseData.response.message);
              this.router.navigate(['']);
            } else {
              alert(this.responseData.response.message);
            }
          },
          error => {
            alert('Error occurred while signing up.');
          }
        );
    } else {
      alert('Invalid form details.');
    }
  }

}
