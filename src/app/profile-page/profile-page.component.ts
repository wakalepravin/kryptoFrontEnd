import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  responseData : any;
  user : any;
  username: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  @ViewChild('profileForm', { static: true }) profileForm: NgForm;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
   private baseUrl = 'http://localhost:8888/userProfile';
  ngOnInit() {
    this.username = this.route.snapshot.params.username;
    this.getProfileData();
  }

  getProfileData() {
    this.http.get(this.baseUrl + '/getUserProfile?username=' + this.username, this.httpOptions)
      .subscribe(
        response => {
          this.responseData = response;
          if (this.responseData.response.success) {
            // alert(this.responseData.response.message);
            this.user = this.responseData.response.data;
            // this.profileForm.setValue(this.responseData.response.data);  
          } else {
            alert(this.responseData.response.message);
          }
        },
        error => {
          alert('Error While Retriving User Profile.');
        }
      );
  }

  saveProfile(event: Event, profileForm: NgForm) {
    if (profileForm.form.valid) {
      // profileForm.form.value.username = this.username;
      this.http.post(this.baseUrl + '/createUserProfile', profileForm.form.value, this.httpOptions)
        .subscribe(
          response => {
            this.responseData = response;
            if (this.responseData.response.success) {
              alert(this.responseData.response.message);
              // profileForm.reset();
              this.router.navigate(['']);
            } else {
              alert(this.responseData.response.message);
            }
          },
          error => {
            alert('Error Occurred While Saving Your Data.');
          }
        );
    }
  }

}
