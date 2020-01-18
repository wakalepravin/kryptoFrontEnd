import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[];
  responseData : any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8888/userProfile';
  ngOnInit() {
    this.getProfileData();
  }

  getProfileData() {
    this.http.get(this.baseUrl + '/getAllUserProfiles',this.httpOptions)
      .subscribe(
        response => {
          this.responseData = response;
          if (this.responseData.response.success) {
            // alert(this.responseData.response.message);
            this.users = this.responseData.response.data;  
          } else {
            alert(this.responseData.response.message);
          }
        },
        error => {
          alert('Error occurred while saving your data.');
        }
      );
  }

}
