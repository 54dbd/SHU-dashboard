import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  ngOnInit() {

  }
  student:any;
  constructor(private http: HttpClient) { }

  onClick(){
    let id = 1101;
    this.http.get<any>("http://localhost:8000/api/students?id=1101").subscribe(res=>{
      this.student = res.name;
      // console.log(res);
    });

  }


}

export class MyComponent{

}