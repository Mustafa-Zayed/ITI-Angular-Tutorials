import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observer, Subscription, tap } from 'rxjs';
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

  constructor(
    private productsService: ProductsService,
    private router: Router
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
  }

  ngOnInit(): void {}

  addProduct() {
    const newProduct: IProduct = {
      id: 200,
      name: 'Added Product',
      price: 1000,
      imgURL: 'https://picsum.photos/300/200',
      quantity: 3,
      categoryID: 1,
    };

    let sub = this.productsService
      .addProduct(newProduct)
      .subscribe(this.observer);

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
