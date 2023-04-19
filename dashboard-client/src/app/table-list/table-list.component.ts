import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";

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
  student_sex:any;
  student_age:any;
  student_dept:any;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.student_id = 1102;
    const params = new HttpParams().set('id', this.student_id);
    this.http.get<any>("http://localhost:8000/api/courseSelection", { params }).subscribe(res=>{
      this.courses=res;
    });
    this.http.get<any>("http://localhost:8000/api/students", { params }).subscribe(res=>{
      res=res[0]
      this.student_name=res.name;
      this.student_age = this.getAge(res.age);
      this.student_sex = res.sex;
      this.student_dept = res.dept;
    });
    this.http.get<any>("http://localhost:8000/api/selectableCourses", { params }).subscribe(res=> {
      this.selectableCourses = res
    });
  }
  getAge(birthdate: Date) {
      const today = new Date();
      const birthdateValue = new Date(birthdate);
      let age = today.getFullYear() - birthdateValue.getFullYear();
      const month = today.getMonth() - birthdateValue.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthdateValue.getDate())) {
        age--;
      }
      return age;
    }
    addCourse(event: MouseEvent){
      const row = (event.target as HTMLButtonElement).parentNode.parentNode.parentNode.parentNode as HTMLTableRowElement;
      const course_id = row.cells[0].textContent;

      const params = new HttpParams().set('id', this.student_id).set('course_id',course_id)
      this.http.get<any>("http://localhost:8000/api/addCourse", { params }).subscribe(res=>{
    });
    }
    removeCourse(event: MouseEvent){
      const row = (event.target as HTMLButtonElement).parentNode.parentNode.parentNode.parentNode as HTMLTableRowElement;
      const course_id = row.cells[0].textContent;
      const params = new HttpParams().set('id', this.student_id).set('course_id',course_id)
      this.http.get<any>("http://localhost:8000/api/removeCourse", { params }).subscribe(res=>{
      });
    }
    getCookie(name) {
      if (!document.cookie) {
        return null;
      }
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const part = cookies[i].trim().split('=');
        if (part[0] === name) {
          return decodeURIComponent(part[1]);
        }
      }
      return null;
    }


}
