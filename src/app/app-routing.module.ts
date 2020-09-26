import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { UserguardGuard } from './shared/userguard.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('../app/newcomponents/login/login.component.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../app/newcomponents/register/register.component.module').then(m => m.RegisterModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/newcomponents/dashboard/dashboard.component.module').then(m => m.DashboardModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../app/components/users/users.component.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('../app/components/home/home.component.module').then(m => m.HomedModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'products',
    loadChildren: () => import('../app/components/products/products.component.module').then(m => m.ProductsModule),
    canActivate: [UserguardGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('../app/components/profile/profile.component.module').then(m => m.ProfileModule)
  },
  {
    path: 'order',
    loadChildren: () => import('../app/components/order/order.component.module').then(m => m.OrderModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'order-list',
    loadChildren: () => import('../app/components/order-list/order-list.component.module').then(m => m.OrderListModule), 
    canActivate: [UserguardGuard]
  },
  {
    path: 'invoice',
    loadChildren: () => import('../app/components/invoice/invoice.component.module').then(m => m.InvoiceModule), 
    canActivate: [UserguardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
