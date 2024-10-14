import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductListComponent } from './Components/Order/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { LightboxDirective } from './Directives/lightbox.directive';
import { USDtoEGPPipe } from './Pipes/usdto-egp.pipe';
import { OrderMasterComponent } from './Components/Order/order-master/order-master.component';
import { StaticProductsService } from './Services/static-products.service';
import { NotFoundComponentComponent } from './Components/NotFoundComponent/NotFoundComponent.component';
import { MainLayoutComponent } from './Components/MainLayout/MainLayout.component';
import { UserLoginComponent } from './Components/UserLogin/UserLogin.component';
import { ProductDetailsComponent } from './Components/Order/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    ProductListComponent,
    LightboxDirective,
    USDtoEGPPipe,
    OrderMasterComponent,
    UserLoginComponent,
    NotFoundComponentComponent,
    MainLayoutComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  // providers: [StaticProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
