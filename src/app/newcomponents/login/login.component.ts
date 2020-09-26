import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  UserList: any = [];
  AdminList: any = [];
  AllUserList: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService

  ) {

  }

  ngOnInit() {
  
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.UserList = JSON.parse(localStorage.getItem("userlist"));
    this.AdminList = JSON.parse(localStorage.getItem("adminlist"));
    if (this.AdminList == null) {
      this.AllUserList = this.UserList;
    }
    else if (this.UserList == null) {
      this.AllUserList = this.AdminList;
    }
    else {
      this.AllUserList = this.UserList.concat(this.AdminList);
    }


  }

  onSubmit(data) {
    this.submitted = true;
    if (this.loginForm.valid) {
      let b = _.find(this.UserList, a => (a.email == data.email && a.password == data.password));
      let c = _.find(this.AdminList, a => (a.email == data.email && a.password == data.password));

      if (b) {
        this.toast.success("Login Successfull!!");

        localStorage.setItem("logged-user", JSON.stringify(b))
        this.router.navigate(['/products']);
      }
      else if (c) {
        this.toast.success("Admin Login Successfull!!");
        localStorage.setItem("logged-user", JSON.stringify(c))
        this.router.navigate(['/dashboard']);
      }
      else {
        Swal.fire('Bad Credential', 'Username or Password Is Incorrect', 'error');
      }
    }
    else {
      this.toast.error("Something Went Wrong!!")
      return
    }

  }


}
