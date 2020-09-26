import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  UserList: any;
  AdminList: any;
  usershow = 0;
  admishow = 0;
  LoggedUser: any
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: any = 'pie';
  constructor(private router: Router,private toast:ToastrService) { }
  ngOnInit() {
    this.LoggedUser = JSON.parse(localStorage.getItem("logged-user"));



    if (this.LoggedUser == null) {
      Swal.fire('No User Found ', 'Please Login Again', 'error');
      this.router.navigate(['/login']);
    }
    else if (!!this.LoggedUser) {
      this.UserList = JSON.parse(localStorage.getItem("userlist"));
      this.AdminList = JSON.parse(localStorage.getItem("adminlist"));
      if (this.UserList == null) {
        this.usershow = 0;
      }
      else if (!!this.UserList) {
        this.usershow = this.UserList.length;
      }
      if (this.AdminList == null) {
        this.admishow = 0;
      }
      else if (!!this.AdminList) {
        this.admishow = this.AdminList.length;
      }
      if (this.UserList == null && this.AdminList == null) {
        Swal.fire('Oops...', 'Please Login First!', 'error')
        this.router.navigate(['/login']);
      }
      this.pieChartLabels = ['Users', 'Admins'];
      this.pieChartData = [this.usershow, this.admishow];
      this.pieChartType = 'pie';
    }

  }


  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }
  onProfile(data) {
    this.router.navigate(['/profile']);
  }
  convertUserList() {
    let doc = new jsPDF();
    let col = ["Firstname", "Lastname", "Email", "Username"];
    let rows = [];
    if (this.UserList == null) {
      Swal.fire('No Record Found ', '', 'error');
    }
    else if (!!this.UserList) {
      this.UserList.forEach(element => {
        let temp = [element.firstName, element.lastName, element.email, element.username];
        rows.push(temp);


      });
      doc.autoTable(col, rows);
      doc.save('userslist.pdf');
    }

  }
  convertAdminList() {
    let doc = new jsPDF();
    let col = ["Firstname", "Lastname", "Email", "Username"];
    let rows = [];
    if (this.AdminList == null) {
      Swal.fire('No Record Found ', '', 'error');

    }
    else if (!!this.AdminList) {
      this.AdminList.forEach(element => {
        let temp = [element.firstName, element.lastName, element.email, element.username];
        rows.push(temp);
      });
      doc.autoTable(col, rows);
      doc.save('adminlists.pdf');
    }
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";


  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
   
  }

 
}
