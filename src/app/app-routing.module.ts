import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  UrlMatchResult,
  UrlSegment,
} from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductListComponent } from './Components/Order/product-list/product-list.component';
import { OrderMasterComponent } from './Components/Order/order-master/order-master.component';
import { NotFoundComponent } from './Components/NotFound/NotFound.component';
import { UserLoginComponent } from './Components/UserLogin/UserLogin.component';
import { MainLayoutComponent } from './Components/MainLayout/MainLayout.component';
import { ProductDetailsComponent } from './Components/Order/product-details/product-details.component';
import { AuthGuard } from './Gaurds/auth.guard';
import { AddProductComponent } from './Components/Order/add-product/add-product.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';

const routes: Routes = [
  // First-match wins strategy, i.e. order matters
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // {path: '', component: HomeComponent},
      { path: '', redirectTo: '/Home', pathMatch: 'full' }, // Default path
      { path: 'Home', component: HomeComponent },
      { path: 'Products', component: ProductListComponent },
      { path: 'Products/:productID', component: ProductDetailsComponent }, // Dynamic/Parameterized route/path
      // {path: 'Products', component: ProductDetailsComponent}, // query string
      { path: 'Product/Add', component: AddProductComponent },
      { path: 'Product/Add/:productID', component: AddProductComponent },
      {
        path: 'Order',
        component: OrderMasterComponent,
        canActivate: [AuthGuard],
      },
      // lazy loading/async route 
      {
        path: 'User',
        loadChildren: () =>
          // import the user.module.ts file
          import('src/app/Components/user/user.module').then(
            // load the UserModule from the file, as there may be multiple modules in the same file
            (m) => m.UserModule
          ),
      },
    ],
  },
  { path: 'Login', component: UserLoginComponent },
  { path: 'Register', component: UserRegisterComponent },
  { path: 'Logout', component: UserLoginComponent },
  { path: '**', component: NotFoundComponent }, // Wild card path, better to be last in the list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// export function productIDMatcher(segments: UrlSegment[]): UrlMatchResult | null {
//   const id = segments[0]?.path;
//   // Check if the ID is a number
//   return !isNaN(+id) ? ({ consumed: [new UrlSegment(id, {})], posParams: { productID: new UrlSegment(id, {}) } }) : null;
// }

// // Matcher for numeric IDs (e.g., Products/123)
// export function numberMatcher(segments: UrlSegment[]): UrlMatchResult | null {
//   const productID = segments[0].path;
//   return /^\d+$/.test(productID) ? { consumed: segments } : null;
// }

// // Matcher for string IDs (e.g., Products/abc123)
// export function stringMatcher(segments: UrlSegment[]): UrlMatchResult | null {
//   const productID = segments[0].path;
//   return /^[a-zA-Z]+$/.test(productID) ? { consumed: segments } : null;
// }
