import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  LoggedUser: any = [];
  constructor(private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    let t = JSON.parse(localStorage.getItem("logged-user"));
    if (t == null) {
      Swal.fire('Oops...', 'Admin Please Login First', 'error');
      this.router.navigate(['/login'])
    }
    else {
      this.LoggedUser = JSON.parse(localStorage.getItem("logged-user"));
    }

  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  onAdminLogout() {
    localStorage.removeItem("logged-user");
    this.toast.success("Admin Logout Successfull", "Success");
    this.router.navigate(['/login']);
  }
  onProfileclick() {
    this.router.navigate(['/profile']);
  }
  onDashboard(){
    this.router.navigate(['/dashboard']);

  }
  onProducts(){
    this.router.navigate(['/home']);

  }
  onUsers(){
    this.router.navigate(['/users']);
  }
  onOrdered(){
    this.router.navigate(['/order']);

  }
}
