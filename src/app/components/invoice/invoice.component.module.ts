import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice.component-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InvoiceRoutingModule,
    SharedModule
  ],
  declarations: [InvoiceComponent],
  exports: [],
})
export class InvoiceModule { }
