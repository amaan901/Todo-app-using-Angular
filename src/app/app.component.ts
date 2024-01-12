import { Component ,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Name', 'Roll_No', 'Email', 'DOB', 'Phone', 'Course', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog :MatDialog , public empservice:EmployeeService, ){}
  

  openAddEditempform() {
    const dialogRef= this.dialog.open(AddEditEmployeeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getemployeelist();
        }
      },
    });
  }
  


  ngOnInit(): void {
    this.getemployeelist()
  }

  getemployeelist(){
    this.empservice.getemployeelist().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  deleteemployee(id:number){
    this.empservice.deleteemployee(id).subscribe({
      next:(res)=>{
        this.getemployeelist();
        alert('Employee deleted!')
      },
      error:console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Updatedata(data: any) {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getemployeelist();
        }
      },
    });
  }
}
