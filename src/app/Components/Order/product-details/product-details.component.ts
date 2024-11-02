import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';
import { StaticProductsService } from 'src/app/Services/static-products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId : number = 0;
  product? : IProduct;
  productIds : number[];
  // products : IProduct[];

  constructor(
    private activatedRoute : ActivatedRoute,
    // private staticProductService : StaticProductsService,
    private productService : ProductsService,
    private location : Location,
    private router: Router) {

      // this.productIds = this.staticProductService.getProductIds();
      // this.products = this.staticProductService.getProducts();
      this.productIds = this.productService.getProductIds();
    }

  ngOnInit(): void {
    console.log('ngOnInit called');

    // // When navigate to same component, WILL NOT reload component
    // // even if there's changes in the route parameters.
    // this.productId = Number(this.activatedRoute.snapshot.paramMap.get('productID')); // productID is the name of param in the specified route
    // // console.log(this.productId);

    // this.product = this.staticProductService.getProductById(this.productId);
    // // console.log(this.product);

    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = Number(params.get('productID'));
      // this.product = this.staticProductService.getProductById(this.productId);

      this.productService.getProductById(this.productId).subscribe(prd => this.product = prd);
    });
  }

  goBack(): void {
    this.location.back();
  }

  prevProduct() {

    // Using productIds array
    let index = this.productIds.findIndex(id => id == this.productId);
    // console.log(index);
    let prevProductId;

    if(index > 0){
      prevProductId = this.productIds[index - 1];
      this.router.navigate(['/Products/', prevProductId])

      // // If we want to navigate to same component using snapshot
      // this.router.navigate(['/Products/', prevProductId]).then(() => {
      //   this.ngOnInit();
      // });
    }

    // // Using products array
    // let productIndex = this.products.findIndex(p => p.id == this.productId);

    // let prevProduct;
    // if(productIndex > 0){
    //   prevProduct = this.products[productIndex - 1];
    //   this.router.navigate(['/Products/', prevProduct.id])
    // }

  }

  nextProduct() {

    // Using productIds array
    let index = this.productIds.findIndex(id => id == this.productId);
    // console.log(index);
    let nextProductId;
    
    if(index < this.productIds.length - 1){
      nextProductId = this.productIds[index + 1];
      this.router.navigate(['/Products/', nextProductId]);

      // // If we want to navigate to same component using snapshot
      // this.router.navigate(['/Products/', nextProductId]).then(() => {
      //   this.ngOnInit();
      // });
    }

    // // Using products array
    // let productIndex = this.products.findIndex(p => p.id == this.productId);
    // let nextProduct;
    // if(productIndex < this.products.length - 1){
    //   nextProduct = this.products[productIndex + 1];
    //   this.router.navigate(['/Products/', nextProduct.id]);
    // }
  }
}
