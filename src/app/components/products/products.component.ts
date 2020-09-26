import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
declare var $: any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<MatCard>;
  productsDisplayed: any = [];
  p: number = 1;
  User: any;
  constructor(private router: Router,
    private bnIdle: BnNgIdleService
  ) {

  }

  ngOnInit(): void {
    $('.navbar-toggler').hide();
    let p = JSON.parse(localStorage.getItem("product-list"));
    if (!!p) {
      this.productsDisplayed = JSON.parse(localStorage.getItem("product-list"));
      console.log(this.productsDisplayed);
      this.dataSource = new MatTableDataSource<MatCard>(this.productsDisplayed);
    }
    else {

    }
  }


  onLogout() {

    Swal.fire({
      title: 'Are you sure want to logout?',
      text: 'Once you logout then you have to login again',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("logged-user");
        this.router.navigate(['/login']);
        Swal.fire(
          'Logout!',
          'You have logout successfull.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })

  }

  onCardClick(data) {
    let index = this.productsDisplayed.findIndex(x => x.name === data.name);
    localStorage.setItem("product-details", JSON.stringify(data));
    this.router.navigate(['/products/', index + 1]);
  }
  onKurtas() {
    let p = _.find(this.productsDisplayed, (a => a.category == "Kurtas"));
    console.log(p);
  }
  onTops() {
    let p = _.find(this.productsDisplayed, (a => a.category == "Tops"));
    console.log(p);
  }
  onTrousers() {
    let p = _.find(this.productsDisplayed, (a => a.category == "Casual Trousers"));
    console.log(p);
  }
  onFootware() {
    let p = _.find(this.productsDisplayed, (a => a.category == "Sports Shoes"));
    console.log(p);
  }
  onDresses() {

    let p = _.find(this.productsDisplayed, (a => a.category == "Dresses"));
    console.log(p);
  }

  onShirts() {
    let p = _.find(this.productsDisplayed, (a => a.category == "Casual Shirts"));
    console.log(p);
  }
  onShoes() {
    let p = _.find(this.productsDisplayed, (a => a.category == "Sports Shoes"));
    console.log(p);
  }
  onHeadphones() {
    let p = _.find(this.productsDisplayed, (a => a.category == "Headphones"));
    console.log(p);
  }
}
