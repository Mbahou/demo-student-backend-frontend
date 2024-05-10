import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Payment} from "../model/student.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{

  studentCode! : string;
  studentPayment! : Array<Payment>;
  paymentDataSOurce! : MatTableDataSource<Payment>;
  public displayedColumns = ['id','date','type','status','amount','firstName','detail'];

  constructor(private activateRoute  : ActivatedRoute ,
              private studentService : StudentsService,
              private router : Router) {
  }
  ngOnInit(): void {
    this.studentCode=this.activateRoute.snapshot.params['code'];
    this.studentService.getStudentPayment(this.studentCode).subscribe({
      next : data =>{
        this.studentPayment=data;
        this.paymentDataSOurce=new MatTableDataSource<Payment>(this.studentPayment);
      },
      error : err => {
        console.log(err);
      }

    });
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/newPayments/${this.studentCode}`);

  }

  paymentDetails(payment : Payment) {
    this.router.navigateByUrl("/admin/payment-details/"+payment.id);

  }
}


