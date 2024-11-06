import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../Models/icategory';
import { GenericAPIHandlerService } from './generic-apihandler.service';
import { APIResponseViewModel } from '../ViewModels/apiresponse-view-model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private genericAPI:GenericAPIHandlerService) {}


  getProductIds(): number[] {
    let prdIds: number[] = [];
    this.getAllProducts().subscribe((prdArr) =>
      prdArr.map((prd) => prdIds.push(prd.id))
    );

    return prdIds;
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.genericAPI.getAll<IProduct[]>('products');
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.genericAPI.getAll<ICategory[]>('categories');
  }

  getProductsByCategoryId(categoryId: number): Observable<IProduct[]> {
    return this.genericAPI.getProductsByCategoryId(categoryId);
  }

  // getItems() returns an observable of type APIResponseViewModel which has a statndard structure
  getItems(categoryId: number): Observable<APIResponseViewModel> {
    return this.genericAPI.getItems('products', { categoryID: categoryId });
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.genericAPI.getById<IProduct>('products',productId);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.genericAPI.post<IProduct>('products', product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.genericAPI.put<IProduct>('products', product);
  }

  deleteProduct(productId: number): Observable<IProduct> {
    return this.genericAPI.delete<IProduct>('products', productId);
  }
}
