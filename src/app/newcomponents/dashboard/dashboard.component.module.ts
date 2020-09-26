import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard.component-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartsModule,
    SharedModule
  ],
  declarations: [DashboardComponent],
  exports: [],
})
export class DashboardModule { }
