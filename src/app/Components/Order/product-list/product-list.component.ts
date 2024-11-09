import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';
import { StaticProductsService } from 'src/app/Services/static-products.service';
import { APIResponseViewModel } from 'src/app/ViewModels/apiresponse-view-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  // providers: [StaticProductsService] // This limits the service only to that component level, i.e. other components in the same module won't be able to access it. Registering a service at the component level means that each instance of the component gets its own instance of the service.
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy {
  // categories: ICategory[];
  prodList: IProduct[] = [];
  orderTotalPrice: number = 0;
  // @Input()
  // recievedSelectedCategoryName: string = '';
  @Input()
  recievedSelectedCategoryId: number = 0;
  // orderDate: Date = new Date();
  @Output()
  onTotalPriceChanged: EventEmitter<number>; // number is the type of the value that will be emitted/returned.

  cart = new Map<IProduct, number>();

  subscriptions: Subscription[] = [];

  productIdToDelete: number | null = null;

  // Reference to the modal element
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  constructor(
    // private staticProductService: StaticProductsService,
    private productsService: ProductsService,
    private router: Router
  ) {
    // this.categories = [
    //   {
    //     id: 1,
    //     name: 'Laptops',
    //   },
    //   {
    //     id: 2,
    //     name: 'Tablets',
    //   },
    //   {
    //     id: 3,
    //     name: 'Mobiles',
    //   },
    // ];

    // this.prodList = [
    //   {
    //     id: 100,
    //     name: 'Lenovo laptop',
    //     price: 1000,
    //     imgURL: 'https://picsum.photos/300/200',
    //     quantity: 3,
    //     categoryID: 1,
    //   },
    //   {
    //     id: 200,
    //     name: 'Apple MacBook Air laptop',
    //     price: 1500,
    //     imgURL: 'https://picsum.photos/300/200',
    //     quantity: 2,
    //     categoryID: 1,
    //   },
    //   {
    //     id: 300,
    //     name: 'lenovo tablet',
    //     price: 400,
    //     imgURL: 'https://picsum.photos/300/200',
    //     quantity: 4,
    //     categoryID: 2,
    //   },
    //   {
    //     id: 400,
    //     name: 'Apple iPad',
    //     price: 700,
    //     imgURL: 'https://picsum.photos/300/200',
    //     quantity: 2,
    //     categoryID: 2,
    //   },
    //   {
    //     id: 500,
    //     name: 'Samsung S22 Ultra',
    //     price: 1000,
    //     imgURL: 'https://picsum.photos/300/200',
    //     quantity: 1,
    //     categoryID: 3,
    //   },
    //   {
    //     id: 600,
    //     name: 'Apple iPhone',
    //     price: 2000,
    //     imgURL: 'https://picsum.photos/300/200',
    //     quantity: 5,
    //     categoryID: 3,
    //   },
    // ];

    this.onTotalPriceChanged = new EventEmitter<number>();
  }

  ngOnInit(): void {
    // // No need for this in my case as I return the filtered method returns the filtered list not void.
    // this.staticProductService.getProducts(); // Get all products at the beginning of the application

    let sub = this.productsService
      .getAllProducts()
      .subscribe((prods) => (this.prodList = prods));
    this.subscriptions.push(sub);
  }

  ngOnChanges(): void {
    // No need for this in my case as I return the filtered method returns the filtered list not void.
    // this.filterCategoriesByRecievedSelectedCategoryName();
    // this.filterCategoriesByRecievedSelectedCategoryId();

    // this.prodList = this.staticProductService.getProductsByCategoryID(this.recievedSelectedCategoryId);

    this.filterCategoriesByRecievedSelectedCategoryId2();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  buy(productId: number, itemsCount: number, productPrice: number) {
    // let p: IProduct | undefined = this.prodList.find((p) => p.id === productId);
    // let p: IProduct | undefined = this.staticProductService.getProductById(productId);
    let p: IProduct | undefined;
    this.productsService.getProductById(productId).subscribe((prd) => {
      p = prd;
    });
    if (p) {
      if (p.quantity > 0 && p.quantity >= itemsCount && itemsCount > 0) {
        p.quantity -= itemsCount;
        this.orderTotalPrice += productPrice * itemsCount;

        // emit/fire/execute the event at this moment and include the orderTotalPrice as the return value
        // of the event. The return value will be available to event subscribers through the $event param.
        this.onTotalPriceChanged.emit(this.orderTotalPrice);
      }
    }
  }

  addToCart(p: IProduct, itemsCount: number) {
    const productQuantityInCart = this.cart.get(p) || 0;
    console.log(productQuantityInCart);

    // const productQuantity = this.cart.get(p);

    if (
      p.quantity > 0 &&
      p.quantity >= itemsCount &&
      itemsCount > 0 &&
      productQuantityInCart + itemsCount <= p.quantity
    ) {
      this.cart.set(p, productQuantityInCart + itemsCount);
      console.log(this.cart);
    }
  }

  // setSelectedCategory(cat:string) {
  //   this.selectedCategory = cat;
  // }

  // setSelectedCategory2(event: Event) {
  //   let target = event.target as HTMLInputElement;
  //   this.selectedCategory = target.value;
  // }

  // changeCategoryToMobiles() {
  //   this.selectedCategory = 'Mobiles';
  // }

  // filterProductsByProductCategoryId(productCategoryId: number) : boolean {
  //   for(let c of this.categories){
  //     // First, find the product
  //     if(productCategoryId === c.id)
  //       // Then, check if it's in the selected category
  //       if(this.selectedCategory === c.name)
  //         return true;
  //   }
  //   return false;
  // }

  // filterCategoriesByRecievedSelectedCategoryName() : IProduct[] {

  //   // If no category is selected, return all products
  //   if(this.recievedSelectedCategoryName === '' || this.recievedSelectedCategoryName === 'Select one')
  //     return this.prodList;

  //   // If a category is selected, return only products in that category
  //   for(let c of this.categories){
  //     // get the selected category, and return only products in that category
  //     if(this.recievedSelectedCategoryName === c.name)
  //       return this.prodList.filter(p => p.categoryID === c.id);
  //   }
  //   return [];
  // }

  ////

  // filterCategoriesByRecievedSelectedCategoryId() : IProduct[] {
  //   if(this.recievedSelectedCategoryId == 0)
  //     return this.prodList;

  //   return this.prodList.filter(p => p.categoryID == this.recievedSelectedCategoryId);
  // }

  ////

  // filterCategoriesByRecievedSelectedCategoryId() : IProduct[] {
  //   return this.staticProductService.getProductsByCategoryID(this.recievedSelectedCategoryId);
  // }

  filterCategoriesByRecievedSelectedCategoryId2() {
    // let sub = this.productsService.getProductsByCategoryId(this.recievedSelectedCategoryId).subscribe(
    //   (prds) => {this.prodList = prds;}
    // );
    // this.subscriptions.push(sub);

    // getItems() returns an observable of type APIResponseViewModel which has a statndard structure
    let sub = this.productsService
      .getItems(this.recievedSelectedCategoryId)
      .subscribe((apiResponseViewModel: APIResponseViewModel) => {
        if (apiResponseViewModel.success) {
          this.prodList = apiResponseViewModel.data;
          console.log('Success Response:', apiResponseViewModel);
        } else {
          console.log('Error Response:', apiResponseViewModel);
        }
      });

    this.subscriptions.push(sub);
  }

  // This function is optionally passed into the NgForOf directive to customize how
  // NgForOf uniquely identifies items in an iterable  when items in the iterable are
  // reordered, new items are added, or existing items are removed..
  productTrackByFn(index: number, product: IProduct) {
    return product.id;
  }

  getProducts(): IProduct[] {
    // return this.staticProductService.getProducts();

    let products: IProduct[] = [];
    this.productsService.getAllProducts().subscribe((prds) => {
      products = prds;
    });
    return products;
  }

  openProductDetails(productId: number) {
    // this.router.navigateByUrl(`/Products/${productId}`);
    this.router.navigate(['/Products', productId]);
    // this.router.navigate(['/Products'], { queryParams: { productID: productId } }); // Query String
  }

  // deleteProduct(productId: number) {
  //   // alert('Are you sure you want to delete this product?');
  //   this.productsService.deleteProduct(productId).subscribe(() => {
  //     console.log('Deleted product with id: ' + productId);
  //     this.prodList = this.prodList.filter((p) => p.id !== productId);
  //     // this.prodList=this.getProducts();
  //   })
  // }

  /**
   * Modal is decoupled from the table. When the "Delete" button is clicked, the modal does not
   * inherently know which product was selected. Storing the product ID ensures that the modal is
   * aware of the product associated with the delete action.
   * The modal opens as a separate UI element. If you don't store the product ID, the modal would
   * have no way of knowing which product to delete when the user clicks "Confirm Delete."
   * Storing the ID bridges this gap.
   */
  setProductIdToDelete(productId: number): void {
    this.productIdToDelete = productId;
  }

  confirmDelete(): void {
    if (this.productIdToDelete !== null) {
      let sub = this.productsService
        .deleteProduct(this.productIdToDelete)
        .subscribe(() => {
          console.log('Deleted product with id: ' + this.productIdToDelete);
          this.prodList = this.prodList.filter(
            (p) => p.id !== this.productIdToDelete
          );
          this.productIdToDelete = null;
        });
    }
  }

  // onMouseOver(event: Event) {
  //   let img = event.target as HTMLImageElement;
  //   img.style.border = '3px solid yellow';
  // }
  // onMouseOut(event: Event) {
  //   let img = event.target as HTMLImageElement;
  //   img.style.border = '2px solid red';
  // }
}
