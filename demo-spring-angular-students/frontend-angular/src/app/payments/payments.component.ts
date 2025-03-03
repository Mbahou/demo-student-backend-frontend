import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentsService} from "../services/students.service";
import {Router} from "@angular/router";
import {Payment} from "../model/student.model";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit, AfterViewInit{
  public payments : any;
  public displayedColumns = ['id','date','type','status','amount','firstName'];
  public dataSource : any;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
 constructor(private http : HttpClient,
             private studentService : StudentsService,
             private router : Router) {
 }
 ngOnInit() {
     this.studentService.getALlPayment().subscribe({
         next : value => {
             this.payments = value;
             this.dataSource = new MatTableDataSource(this.payments);
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
         },
         error : err => {
             console.log(err);
         }
     })
 }

 ngAfterViewInit() {

 }

    paymentDetails(payment : Payment) {
     this.router.navigateByUrl("/admin/payment-details/"+payment.id);
        
    }
}
