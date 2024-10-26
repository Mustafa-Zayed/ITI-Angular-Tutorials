import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.scss']
})
export class OrderMasterComponent implements OnInit, AfterViewInit {

  categories: ICategory[];
  // prodList: IProduct[];
  // selectedCategoryName: string = '';
  selectedCategoryId: number = 0;
  recievedOrderTotalPrice: number = 0;
  orderDate: Date = new Date();

  // clientNameInpElem: ElementRef = new ElementRef('')
  // clientNameInpElem: ElementRef = {} as ElementRef;
  // clientNameInpElem: ElementRef | undefined = undefined;
  // clientNameInpElem: ElementRef | null= null;
  // clientNameInpElem?: ElementRef; //optional, similar to | undefined
  @ViewChild('clientNameInp') clientNameInpElem!: ElementRef; // Non-null asseration operator
  // @ViewChild('clientNameInp') clientNameInpElem!: HTMLElement;
  @ViewChild(ProductListComponent) prdListCompObj!: ProductListComponent; // Non-null asseration operator
  // @ViewChild('x') prdListCompObj!: ProductListComponent; // Non-null asseration operator

  constructor() {
    this.categories = [
      {
        id: 1,
        name: 'Laptops',
      },
      {
        id: 2,
        name: 'Tablets',
      },
      {
        id: 3,
        name: 'Mobiles',
      },
    ];
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
  }

  totalPriceChanged(totalPrice: number) {
    this.recievedOrderTotalPrice = totalPrice;
  }

  changeCategoryToMobiles() {
    // this.selectedCategoryName = 'Mobiles';
    this.selectedCategoryId = 3;
  }

  placeOrder() {
    // let p : IProduct = this.prdListCompObj.prodList[5];

    // if(p.quantity > 0)
    //   p.quantity -= 1;
    // else
    //   alert('No items left');

    // let prodList: IProduct[] = this.prdListCompObj.prodList;
    let prodList: IProduct[] = this.prdListCompObj.getProducts();
    let cart = this.prdListCompObj.cart;

    for (const [product, quantity] of cart.entries()) {
      prodList.find((p) => p.id === product.id)!.quantity -= quantity;
      this.recievedOrderTotalPrice += product.price * quantity;
    }

    cart.clear();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.clientNameInpElem.nativeElement.value = 'Enter your name';
    this.clientNameInpElem.nativeElement.placeholder = 'Enter your name';
    this.clientNameInpElem.nativeElement.style.border = '2px solid red';
    // this.clientNameInpElem.innerText = 'Enter your name';
    // this.clientNameInpElem.style.border = '2px solid red';
    
    // console.log(this.prdListCompObj.prodList);
    // console.log(this.prdListCompObj.getProducts());
  }
}
