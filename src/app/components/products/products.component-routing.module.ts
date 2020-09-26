import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DelieveryComponent } from './delievery/delievery.component';
import { UserguardGuard } from 'src/app/shared/userguard.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductsComponent },
      {
        path: ':id', children: [
          { path: '', component: ProductDetailsComponent, canActivate: [UserguardGuard] },
          { path: 'case-on-delivey', component: DelieveryComponent, canActivate: [UserguardGuard] },
        ],
      },
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
