import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AngularFireDatabase } from '@angular/fire/database';
declare var $: any;
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private router: Router, private db: AngularFireDatabase) { }
  Profile: any = [];
  UserOrdered: any = [];
  Filtereddata: any = [];
  render=false;
  ngOnInit(): void {
    this.render=true;
    $('.navbar-toggler').hide();
    this.UserOrdered = this.db.list('List').valueChanges().subscribe((data: any) => {
      this.render=false;
      this.UserOrdered = data;
      this.Profile = JSON.parse(localStorage.getItem("logged-user"));
      this.Filtereddata = _.filter(this.UserOrdered, a => a.email == this.Profile.email);
    });
  }
  Invoice(list) {
    localStorage.setItem("invoice", JSON.stringify(list));
    this.router.navigate(['/invoice'])
  }
}
