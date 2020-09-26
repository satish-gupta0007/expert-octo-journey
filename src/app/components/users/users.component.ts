import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSidenav } from '@angular/material/sidenav';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  UserList: any = []
  displayedColumns: string[] = ['id', 'photo', 'firstName', 'lastName', 'email', 'username', 'action'];
  dataSource: MatTableDataSource<any>;
  LoggedUser: any;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, public dialog: MatDialog) { }


  ngOnInit(): void {
    let p = JSON.parse(localStorage.getItem("userlist"));
    if (!!p) {
      this.UserList = JSON.parse(localStorage.getItem("userlist"));
      this.dataSource = new MatTableDataSource(this.UserList);
    }
    else {

    }
    // this.LoggedUser = JSON.parse(localStorage.getItem("logged-user"));
    // if (this.LoggedUser == null) {
    //   Swal.fire('Oops...', 'Admin Please Login First', 'error');
    //   this.router.navigate(['/login'])
    // }
    // else {
    //   let p = JSON.parse(localStorage.getItem("userlist"));
    //   if (!!p) {
    //     this.UserList = JSON.parse(localStorage.getItem("userlist"));
    //     this.dataSource = new MatTableDataSource(this.UserList);
    //   }
    //   else {

    //   }
    // }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
    if (!!this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }


  }
  onAddClick() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.dataSource.paginator = this.paginator;
    });

  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  onEdit(editdata) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '400px',
      data: editdata
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.dataSource.paginator = this.paginator;

    });
  }
  ondelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        var ind = this.UserList.findIndex(function (element) {
          return element.firstName === id.firstName;
        })
        if (ind !== -1) {
          this.UserList.splice(ind, 1)
        }
        localStorage.setItem("userlist", JSON.stringify(this.UserList));
        this.ngOnInit();
        this.dataSource.paginator = this.paginator;


        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
