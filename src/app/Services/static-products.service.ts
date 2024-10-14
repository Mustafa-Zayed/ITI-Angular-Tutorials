import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
  // ,providedIn: 'AppModule' // If you don't want this service to be available to other components unless they import AppModule.
})
export class StaticProductsService {

  private prodList: IProduct[];
  constructor() {
    this.prodList = [
      {
        id: 100,
        name: 'Lenovo laptop',
        price: 1000,
        imgURL: 'https://picsum.photos/300/200',
        quantity: 3,
        categoryID: 1,
      },
      {
        id: 200,
        name: 'Apple MacBook Air laptop',
        price: 1500,
        imgURL: 'https://picsum.photos/300/200',
        quantity: 2,
        categoryID: 1,
      },
      {
        id: 300,
        name: 'lenovo tablet',
        price: 400,
        imgURL: 'https://picsum.photos/300/200',
        quantity: 4,
        categoryID: 2,
      },
      {
        id: 400,
        name: 'Apple iPad',
        price: 700,
        imgURL: 'https://picsum.photos/300/200',
        quantity: 2,
        categoryID: 2,
      },
      {
        id: 500,
        name: 'Samsung S22 Ultra',
        price: 1000,
        imgURL: 'https://picsum.photos/300/200',
        quantity: 1,
        categoryID: 3,
      },
      {
        id: 600,
        name: 'Apple iPhone',
        price: 2000,
        imgURL: 'https://picsum.photos/300/200',
        quantity: 5,
        categoryID: 3,
      },
    ];
  }

  getProducts(): IProduct[] {
    return this.prodList;
  }
  
  getProductsByCategoryID(categoryID: number): IProduct[] {
    if (categoryID == 0)
      return this.prodList;
    
    return this.prodList.filter(p => p.categoryID == categoryID);
  }

  getProductById(id: number): IProduct | undefined {
    return this.prodList.find(p => p.id == id);
  }
  
}
