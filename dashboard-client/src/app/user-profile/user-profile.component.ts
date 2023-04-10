import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  student=""
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  onClick(){
    this.http.get<any>("localhost:8888/api/students").subscribe(res=>{
      this.student = res;
      alert(res);
    })

  }

}

export class MyComponent{

}