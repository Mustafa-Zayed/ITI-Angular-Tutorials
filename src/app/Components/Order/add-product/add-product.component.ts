import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer, Subscription, tap } from 'rxjs';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private observer: Observer<IProduct>;
  successAlert: boolean = false;
  failedAlert: boolean = false;
  productId: number = 0;

  newProduct: IProduct = {
    // set the default value to null which is a value that Angular's required validator
    // considers invalid, and to match the selected option in the dropdown list
    categoryID: null,
  } as unknown as IProduct;

  catList: ICategory[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.observer = {
      next: (product: IProduct) => {
        console.log(product);
        this.successAlert = true;
        // alert('Product Added Successfully'); // not recommended
        setTimeout(() => {
          router.navigate(['/Products']);
        }, 2000);
      },
      error: (err: Error) => {
        console.log(err.message);
        this.failedAlert = true;
        // alert('Failed to Add Product'); // not recommended
        setTimeout(() => {
          router.navigate(['/Products']);
        }, 2000);
      },
      complete: () => console.log('Completed!'),
    };

    this.productsService.getAllCategories().subscribe((catArr) => {
      this.catList = catArr;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = Number(params.get('productID'));

      // console.log(this.productId);
      if (this.productId == 0) return; // no productId means it's a new product not editing, Number(null) => 0

      // if (!params.has('productID')) return;

      let sub = this.productsService
        .getProductById(this.productId)
        .subscribe((product) => {
          this.newProduct = product;

          // reset the imgURL as browsers restrict programmatic interaction with file input fields
          // to protect user privacy and to avoid security vulnerabilities.
          // Not professional solution, but it works anyway.
          this.newProduct.imgURL = ''; 
        });
      this.subscriptions.push(sub);
    });
  }

  addOrUpdateProduct() {
    // if there's no productID, then it's a new product
    if (this.productId == 0) {
      let sub = this.productsService
        .addProduct(this.newProduct)
        .subscribe(this.observer);
    }

    let sub = this.productsService
      .updateProduct(this.newProduct)
      .subscribe(this.observer);

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
