import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  addemployee(data:any): Observable<any> {
    return this.http.post("http://localhost:3000/students",data)
  }

  getemployeelist(): Observable<any> {
    return this.http.get("http://localhost:3000/students")
  }
  

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/students/${id}`, data);
  }

  deleteemployee(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/students/${id}`);
  }

  
}
