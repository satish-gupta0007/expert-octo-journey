import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.component-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   ProfileRoutingModule,
   SharedModule
  ],
  declarations: [ProfileComponent],
  exports: [],
})
export class ProfileModule { }
