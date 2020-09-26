import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  ProducList: any = [];
  submitted = false;
  Picture: any;
  show = false;
  foods = [
    { value: 'Tops', viewValue: 'Tops' },
    { value: 'Casual Trousers', viewValue: 'Casual Trousers' },
    { value: 'Kurtas', viewValue: 'Kurtas' },
    { value: 'Casual Footware', viewValue: 'Casual Footware' },
    { value: 'Dresses', viewValue: 'Dresses' },
    { value: 'Casual Shirts', viewValue: 'Casual Shirts' },
    { value: 'Sports Shoes', viewValue: 'Sports Shoes' },
    { value: 'Headphones', viewValue: 'Headphones' },
    { value: 'Watches', viewValue: 'Watches' },

  ];
  constructor(private fb: FormBuilder, private toastr: ToastrService, public dialogRef: MatDialogRef<AddComponent>) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      category:['',Validators.required],
      picture: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    })

  }
  // onCategorySelect(category) {
  //   debugger
  //   console.log(category);
  //   if(category="Tops"){

  //   }
  // }
  AddProducts(data) {
   
    this.submitted = true;
    let p = JSON.parse(localStorage.getItem("product-list"));
    if (this.addForm.valid) {
      if (p == null) {  
        data.picture = this.Picture;
        this.ProducList.push(data);
        localStorage.setItem("product-list", JSON.stringify(this.ProducList));
        this.toastr.success('Products Added Succeessfull!!', 'Success!!');
        this.dialogRef.close();
      }
      else if (!!p) {
        this.ProducList = JSON.parse(localStorage.getItem("product-list"));
        data.picture = this.Picture;
        this.ProducList.push(data);
        localStorage.setItem("product-list", JSON.stringify(this.ProducList));
        this.toastr.success('Products Added Succeessfull!!', 'Success!!');
        this.dialogRef.close();
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
