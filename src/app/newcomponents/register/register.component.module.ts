import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register.component-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
  ],
  declarations: [RegisterComponent],
  exports: [],
})
export class RegisterModule { }
