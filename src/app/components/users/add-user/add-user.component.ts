import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  ProducList: any = [];
  submitted = false;
  Picture: any;
  show = false;
  OldUserList: any = [];
  constructor(private fb: FormBuilder, private toastr: ToastrService, public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      picture: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, , Validators.minLength(6)]],
      usertype: ['user']
    })

  }
  AddProducts(data) {
    this.submitted = true;
    let p = JSON.parse(localStorage.getItem("userlist"));

    if (this.addForm.valid) {
      if (p == null) {
        data.picture = this.Picture;
        this.OldUserList.push(data);
        localStorage.setItem("userlist", JSON.stringify(this.OldUserList));
        this.toastr.success('User Added Succeessfull!!', 'Success!!');
        this.dialogRef.close();
      }
      else {
        this.OldUserList = JSON.parse(localStorage.getItem("userlist"));

        let b = _.find(this.OldUserList, a => a.email == data.email);
        if (!!b) {
          Swal.fire('Oops...', 'This Email Id Is Already Registered', 'error');
        }
        else {
          data.picture = this.Picture;
          this.OldUserList.push(data);
          localStorage.setItem("userlist", JSON.stringify(this.OldUserList));
          this.toastr.success('User Added Succeessfull!!', 'Success!!');
          this.dialogRef.close();
        }

      }

    }
    else {

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
      this.show = true;
      this.Picture = reader.result as string;
    };
    reader.onerror = (error) => {
    };
  }
}
