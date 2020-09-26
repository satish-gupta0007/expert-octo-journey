import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  updateForm: FormGroup;
  Picture: any;
  show = false;
  phototrigger = false;
  submitted = false;
  UserList: any = [];
  test: any;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({

      picture: [''],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      email: [this.data.email, Validators.required],
      username: [this.data.username, Validators.required],
      password: [this.data.password, Validators.required],
      usertype: [this.data.usertype]

    })
    this.UserList = JSON.parse(localStorage.getItem("userlist"));
    this.test = _.find(this.UserList, a => (a.firstName == this.data.firstName));

  }

  AddProducts(details) {
    this.submitted = true;
    if (this.updateForm.valid) {
      if (this.phototrigger == true) {
        details.picture = this.Picture;
      }
      else {
        details.picture = this.data.picture;
      }
      if (this.test.email == details.email) {
        let stored = Object.assign(this.test, details);
        localStorage.setItem("userlist", JSON.stringify(this.UserList));
        this.dialogRef.close();
      }
      else {
        let b = _.find(this.UserList, a => a.email == details.email);
        if (!!b) {
          Swal.fire('Oops...', 'This Email Id Is Already taken Someone', 'error');
        }
        else {
          let stored = Object.assign(this.test, details);
          localStorage.setItem("userlist", JSON.stringify(this.UserList));
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
      this.phototrigger = true;
    };
    reader.onerror = (error) => {
    };
  }

}
