import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {Student} from "../model/student.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  student! : Student[];
  public dataSource! : MatTableDataSource<Student>;
  public displayedColumns = ['id','code','firstName','lastName','programId','photo','payments'];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;



  constructor(private studentService : StudentsService,private router : Router) {
  }
  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe({
      next : data => {
        this.student=data;
        this.dataSource = new MatTableDataSource(this.student);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    },
    error : err => {
        console.log(err);
    }
    });
  }


  studentPayment(student: Student) {
    this.router.navigateByUrl("/admin/student-details/"+student.code);
    
  }
}
