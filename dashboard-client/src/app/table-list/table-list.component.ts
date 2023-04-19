import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  courses:any[];
  selectableCourses:any[];
  student_id:any;
  student_name:any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.student_id = 1102;
    const params = new HttpParams().set('id', this.student_id);
    this.http.get<any>("http://localhost:8000/api/courseSelection", { params }).subscribe(res=>{
      this.courses=res;
    });
    this.http.get<any>("http://localhost:8000/api/students", { params }).subscribe(res=>{
      this.student_name=res.name;
    });
    this.http.get<any>("http://localhost:8000/api/selectableCourses", { params }).subscribe(res=> {
      this.selectableCourses = res
    });
  }

}
