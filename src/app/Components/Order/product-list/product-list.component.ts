import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { StaticProductsService } from 'src/app/Services/static-products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  // providers: [StaticProductsService] // This limits the service only to that component level, i.e. other components in the same module won't be able to access it. Registering a service at the component level means that each instance of the component gets its own instance of the service.
})
export class ProductListComponent implements OnInit, OnChanges {

  // categories: ICategory[];
  // prodList: IProduct[];
  orderTotalPrice: number = 0;
  // @Input()
  // recievedSelectedCategoryName: string = '';
  @Input()
  recievedSelectedCategoryId: number = 0;
  // orderDate: Date = new Date();
  @Output()
  onTotalPriceChanged: EventEmitter<number>; // number is the type of the value that will be emitted/returned.

  cart = new Map<IProduct, number>();


  constructor(private productService: StaticProductsService,
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

  ngOnChanges(): void {
    // No need for this in my case as I return the filtered method returns the filtered list not void.
    // this.filterCategoriesByRecievedSelectedCategoryName();
    // this.filterCategoriesByRecievedSelectedCategoryId();

    // this.productService.getProductsByCategoryID(this.recievedSelectedCategoryId);
  }

  buy(productId: number, itemsCount: number, productPrice: number) {
    // let p: IProduct | undefined = this.prodList.find((p) => p.id === productId);
    let p: IProduct | undefined = this.productService.getProductById(productId);
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

  addToCart(p: IProduct, itemsCount: number){
    const productQuantityInCart = this.cart.get(p) || 0;
    console.log(productQuantityInCart);

    // const productQuantity = this.cart.get(p);

    if (p.quantity > 0 && p.quantity >= itemsCount && itemsCount > 0 
      && productQuantityInCart + itemsCount <= p.quantity) {
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

  filterCategoriesByRecievedSelectedCategoryId() : IProduct[] {
    return this.productService.getProductsByCategoryID(this.recievedSelectedCategoryId);
  }

  // This function is optionally passed into the NgForOf directive to customize how
  // NgForOf uniquely identifies items in an iterable  when items in the iterable are
  // reordered, new items are added, or existing items are removed..
  productTrackByFn(index: number, product: IProduct){
    return product.id;
  }

  getProducts() : IProduct[] {
    return this.productService.getProducts();
  }

  openProductDetails(productId: number){
    // this.router.navigateByUrl(`/Products/${productId}`);
    this.router.navigate(['/Products', productId]);
    // this.router.navigate(['/Products'], { queryParams: { productID: productId } }); // Query String

  }
  
  // onMouseOver(event: Event) {
  //   let img = event.target as HTMLImageElement;
  //   img.style.border = '3px solid yellow';
  // }
  // onMouseOut(event: Event) {
  //   let img = event.target as HTMLImageElement;
  //   img.style.border = '2px solid red';
  // }
  
  ngOnInit(): void {
    // // No need for this in my case as I return the filtered method returns the filtered list not void.
    // this.productService.getProducts(); // Get all products at the beginning of the application
  }
}
