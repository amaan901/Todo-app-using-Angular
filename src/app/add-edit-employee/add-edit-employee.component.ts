import { Component, Inject, OnInit, inject, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private empservice: EmployeeService,
    private dialogRef: MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  empform!: FormGroup;

  ngOnInit(): void {
    this.signupform();
    this.empform.patchValue(this.data)
  }


  signupform() {
    this.empform = this.formBuilder.group({
      'Name': [null],
      'Roll_No': [null],
      'Email': [null],
      'DOB': [null],
      'Phone': [null],
      'Course': [null],
    })
  }

  employeesumbitbtn() {
    if (this.empform.valid) {
      if (this.data) {
        this.empservice.updateEmployee(this.data.id, this.empform.value).subscribe({
          next: (data: any) => {
            alert('Employee update Successfully');
            this.dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      } else {
        this.empservice.addemployee(this.empform.value).subscribe({
          next: (data: any) => {
            alert('Employee added Successfully');
            this.dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    }
  }
}
