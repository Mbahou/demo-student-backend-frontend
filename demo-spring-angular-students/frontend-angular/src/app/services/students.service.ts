import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Payment, Student} from "../model/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http : HttpClient) { }

  getALlPayment():Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payments`);
  }
  getAllStudents():Observable<Array<Student>>{
    return this.http.get<Array<Student>>(`${environment.backendHost}/students`);
  }
  getStudentPayment(code : string):Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/students/${code}/payments`);
  }

  savepayment(formDta : any):Observable<Payment>{
    return this.http.post<Payment>(`${environment.backendHost}/payments`,formDta);
  }

    getPaymentsDetails(idPaiment: number) {
       return this.http.get(`${environment.backendHost}/payments/${idPaiment}/file`,
           {responseType :'blob'
       });


    }
}
