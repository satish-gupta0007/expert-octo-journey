import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  UserList: any = [];
  AdminList: any = [];
  Picture: any;
  show: boolean;
  show1 = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,

  ) {
    this.show = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [' ', Validators.required],
      picture: ['', Validators.required],
      usertype: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  onSubmit(data) {
    this.submitted = true;
    if (this.registerForm.valid) {
      if (data.usertype == "user") {
        let test = localStorage.getItem("userlist")
        if (test == null) {
          data.picture = this.Picture;
          this.UserList.push(data);
          localStorage.setItem("userlist", JSON.stringify(this.UserList));
          this.toast.success("User Created Successfully");
          this.router.navigate(['/login']);
        }
        else {
          this.UserList = JSON.parse(localStorage.getItem("userlist"));
          let b = _.find(this.UserList, a => a.email == data.email);
          if (!!b) {
            Swal.fire('Oops...', 'This Email Id Is Already Registered', 'error');
          }
          else {
            this.UserList = JSON.parse(localStorage.getItem("userlist"));
            data.picture = this.Picture;
            this.UserList.push(data);
            localStorage.setItem("userlist", JSON.stringify(this.UserList));
            this.toast.success("User Created Successfully");
            this.router.navigate(['/login']);
          }
        }
      }
      else if (data.usertype == "admin") {
        let test = localStorage.getItem("adminlist")
        if (test == null) {
          data.picture = this.Picture;
          this.AdminList.push(data);
          localStorage.setItem("adminlist", JSON.stringify(this.AdminList));
          this.toast.success("Admin Created Successfully");
          this.router.navigate(['/login']);
        }
        else {
          this.AdminList = JSON.parse(localStorage.getItem("adminlist"));
          let b = _.find(this.AdminList, a => a.email == data.email);
          if (!!b) {
            Swal.fire('Oops...', 'This Email Id Is Already Registered', 'error');
          }
          else {
            this.AdminList = JSON.parse(localStorage.getItem("adminlist"));
            data.picture = this.Picture;
            this.AdminList.push(data);
            localStorage.setItem("adminlist", JSON.stringify(this.AdminList));
            this.toast.success("Admin Created Successfully");
            this.router.navigate(['/login']);
          }
        }
      }
    }
    else {
      this.toast.error("Something Went Wrong");
      return
    }
  }
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Picture = reader.result as string;
    };
    reader.onerror = (error) => {
    };
  }
  password() {
    this.show = !this.show;
    this.show1 = false;
  }
  password1(){
    this.show = !this.show;
    this.show1=true;
  }
}
