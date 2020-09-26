import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  productsList: any = [];
  LoggedUser: any;
  displayedColumns: string[] = ['id', 'photo', 'name', 'description', 'price', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private router: Router, private toast: ToastrService) {
  }

  ngOnInit(): void {
    let p = JSON.parse(localStorage.getItem("product-list"));
    if (!!p) {
      this.productsList = JSON.parse(localStorage.getItem("product-list"));
      this.dataSource = new MatTableDataSource(this.productsList);
    }
    else {

    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }


  }
  onAddClick() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.dataSource.paginator = this.paginator;
    });

  }
  onEdit(editdata) {
    const dialogRef = this.dialog.open(EditComponent, {
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
        var ind = this.productsList.findIndex(function (element) {
          return element.name === id.name;
        })
        if (ind !== -1) {
          this.productsList.splice(ind, 1)
        }

        localStorage.setItem("product-list", JSON.stringify(this.productsList));
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
