import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AngularFireDatabase } from '@angular/fire/database';
import { formatDate } from '@angular/common';


declare var $: any;

@Component({
  selector: 'app-delievery',
  templateUrl: './delievery.component.html',
  styleUrls: ['./delievery.component.scss']
})
export class DelieveryComponent implements OnInit {
  delieveryForm: FormGroup;
  submitted = false;
  ChooseProduct: any;
  OrderedItem: any = [];
  LoggedUser: any = [];
  UserOrderedItem: any = [];
  constructor(private fb: FormBuilder, 
    private router: Router,
    public db: AngularFireDatabase
    
    ) { }

  ngOnInit(): void {
    $('.navbar-toggler').hide();
    this.ChooseProduct = JSON.parse(localStorage.getItem("cod-item"))
    this.delieveryForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'mob': new FormControl('', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])),
      'address': new FormControl('', Validators.compose([Validators.required, Validators.minLength(20)])),
    })

    this.LoggedUser = JSON.parse(localStorage.getItem("logged-user"));
  }
  placeOrder(value) {
    this.submitted = true;
    if (this.delieveryForm.valid) {
      let  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let today  = new Date();
      let date=today.toLocaleDateString("en-US", options); 
      let type = { type: "cod", paymentid: "Manual",transaction:date}
      let l = _.merge(this.ChooseProduct, type);
      let p = _.merge(value, l);
      p.email = this.LoggedUser.email;
      this.db.list('List').push(p);
      Swal.fire(value.name, 'Order Placed Successful ', 'success');
      this.router.navigate(['/products']);
    }

  }
}
