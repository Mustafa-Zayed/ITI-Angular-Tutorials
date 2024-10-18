import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductListComponent } from './Components/Order/product-list/product-list.component';
import { OrderMasterComponent } from './Components/Order/order-master/order-master.component';
import { NotFoundComponent } from './Components/NotFound/NotFound.component';
import { UserLoginComponent } from './Components/UserLogin/UserLogin.component';
import { MainLayoutComponent } from './Components/MainLayout/MainLayout.component';
import { ProductDetailsComponent } from './Components/Order/product-details/product-details.component';

const routes: Routes = [ // First-match wins strategy, i.e. order matters
    {path: '', component: MainLayoutComponent, children: [
      // {path: '', component: HomeComponent},
      {path: '', redirectTo: '/Home', pathMatch: 'full'}, // Default path
      {path: 'Home', component: HomeComponent},
      {path: 'Products', component: ProductListComponent},
      {path: 'Products/:productID', component: ProductDetailsComponent}, // Dynamic/Parameterized route/path
      // {path: 'Products', component: ProductDetailsComponent}, // query string
      {path: 'Order', component: OrderMasterComponent},
    ]},
    {path: 'Login', component: UserLoginComponent},
    {path: '**', component: NotFoundComponent} // Wild card path, better to be last in the list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
