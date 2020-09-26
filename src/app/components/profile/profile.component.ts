import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { AngularFireDatabase } from '@angular/fire/database';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  Profile: any;
  updateForm: FormGroup;
  UserList: any = [];
  test: any;
  Temporay: any = [];
  AdminList: any = [];
  UserOrdered:any=[];
  Picture: any;
  Showbutton=true;
  submitted=false;
  show=false;
  show1 = true;
  constructor(private fb: FormBuilder, private router: Router,private db:AngularFireDatabase) {
   
   }

  ngOnInit(): void {
    
    this.Profile = JSON.parse(localStorage.getItem("logged-user"));
    if (this.Profile == null) {
      Swal.fire('No User Found ', 'Please Login Again', 'error');
      this.router.navigate(['/login']);
    }
    else if (!!this.Profile) {
      this.updateForm = this.fb.group({
        firstName: [this.Profile.firstName,Validators.required],
        lastName: [this.Profile.lastName,Validators.required],
        username: [this.Profile.username,Validators.required],
        email: [this.Profile.email,[Validators.required,Validators.email]],
        password: [this.Profile.password,[Validators.required,Validators.minLength(6)]]
      })
      let t = this.Profile.usertype;
      if (t == "user") {
        $('.navbar-toggler').hide();
        this.UserList = JSON.parse(localStorage.getItem("userlist"));
        this.test = _.find(this.UserList, a => (a.email == this.Profile.email));
      }
      else if (t == "admin") {
        this.AdminList = JSON.parse(localStorage.getItem("adminlist"));
        this.test = _.find(this.AdminList, a => (a.email == this.Profile.email));
        this.Showbutton=false;
      }
    }

  }

  onUpdate(data) {
    this.submitted=true;
    if(this.updateForm.valid){
      let l = this.Profile.usertype;
      if (l == "user") {
        let stored = Object.assign(this.test, data);
        localStorage.setItem("userlist", JSON.stringify(this.UserList));
        $("#exampleModalCenter").modal("hide");
        Swal.fire({
          title: 'Please Login Again',
          text: 'Your Profile Has Been Update ',
          icon: 'success'
        })
        this.router.navigate(['/login']);
        localStorage.removeItem("logged-user");
      }
      else if (l == "admin") {
        let stored = Object.assign(this.test, data);
        localStorage.setItem("adminlist", JSON.stringify(this.AdminList));
        $("#exampleModalCenter").modal("hide");
        Swal.fire({
          title: 'Please Login Again',
          text: 'Your Profile Has Been Update ',
          icon: 'success',
  
        })
        this.router.navigate(['/login']);
        localStorage.removeItem("logged-user");
      }
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
        Swal.fire(
          'Logout!',
          'You have logout successfull.',
          'success'
        )
        localStorage.removeItem("logged-user");
        this.router.navigate(['/login']);
    
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          // 'Your in your :)',
          'error'
        )
      }
    })

  }
  onFileChanged(e, Pf) {
    const file = e.target.files[0];
    this.getBase64(file, Pf);
  }
  getBase64(file, Pf) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Picture = reader.result as string;
      let l = this.Profile.usertype;
      if (l == "user") {
        Pf.picture = this.Picture;
        let stored = Object.assign(this.test, Pf);
        localStorage.setItem("userlist", JSON.stringify(this.UserList));
        let t = JSON.parse(localStorage.getItem('logged-user'));
        t.picture = this.Picture;
        localStorage.setItem('logged-user', JSON.stringify(t));
        this.ngOnInit();
      }
      else if (l == "admin") {
        Pf.picture = this.Picture;
        let stored = Object.assign(this.test, Pf);
        localStorage.setItem("adminlist", JSON.stringify(this.AdminList));
        let t = JSON.parse(localStorage.getItem('logged-user'));
        t.picture = this.Picture;
        localStorage.setItem('logged-user', JSON.stringify(t));
        this.ngOnInit();

      }
    };
    reader.onerror = (error) => {
    };
  }
  getOrderList(){ 
    this.router.navigate(['order-list']);
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
