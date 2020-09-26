import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  updateForm: FormGroup;
  ProducList: any = [];
  submitted = false;
  Picture: any;
  test: any;
  show = false;
  phototrigger = false;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      picture: [''],
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      price: [this.data.price, Validators.required]
    })
    this.ProducList = JSON.parse(localStorage.getItem("product-list"));
    this.test = _.find(this.ProducList, a => (a.name == this.data.name));



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

      let stored = Object.assign(this.test, details);
      localStorage.setItem("product-list", JSON.stringify(this.ProducList));
      this.dialogRef.close();
    

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
