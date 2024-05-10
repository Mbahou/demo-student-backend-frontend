import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PaymentType} from "../model/student.model";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  paymentForm! : FormGroup;
  studentCode! : string;
  paymentType : string[] = [];
  pdfFileUrl! : string;
  showProgress : boolean = false;

  constructor(private fb : FormBuilder,
              private activateRoute : ActivatedRoute,
              private studentService : StudentsService) {
  }
 ngOnInit() {
      for (let elt in  PaymentType){
          let value =PaymentType[elt]
          if (typeof value === 'string'){
              this.paymentType.push(PaymentType[elt]);
          }
      }
    this.studentCode=this.activateRoute.snapshot.params['studentCode'];
    this.paymentForm=this.fb.group({
      date : this.fb.control(''),
      amount : this.fb.control(''),
      type : this.fb.control(''),
      studentCode : this.fb.control(this.studentCode),
      fileSource : this.fb.control(''),
        fileName : this.fb.control(''),
    });
 }



    selectFile(event: any) {
      if (event.target.files.length > 0){
          let file = event.target.files[0];
          this.paymentForm.patchValue({
              fileSource : file,
              fileName : file.name
          })
          this.pdfFileUrl =window.URL.createObjectURL(file);
      }


    }



    savePayment() {
      this.showProgress=true;
      let date = new Date(this.paymentForm.value.date);
      let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      let formData = new  FormData();
      formData.set('date', formattedDate);
      formData.set('amount',this.paymentForm.value.amount);
      formData.set('type',this.paymentForm.value.type);
      formData.set('studentCode',this.paymentForm.value.studentCode);
      formData.set('file',this.paymentForm.value.fileSource);
      this.studentService.savepayment(formData).subscribe({
          next : value => {
              this.showProgress=false;
              alert('Payments Saved successfully !');

          },
          error :err => {
              console.log(err);
          }
      });

    }

    protected readonly event = event;

    afterLoadComplete($event: any){
        console.log($event);

    }
}
