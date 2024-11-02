import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProductIds(): number[]{
    let prdIds:number[] = [];
    this.getAllProducts().subscribe(prdArr => prdArr.map(prd => prdIds.push(prd.id)))

    return prdIds;
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.APIURL}/products`)
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${environment.APIURL}/categories`)
  }

  getProductsByCategoryId(categoryId: number): Observable<IProduct[]> {
    if (categoryId == 0)
      return this.getAllProducts();

    return this.httpClient.get<IProduct[]>(`${environment.APIURL}/products?categoryID=${categoryId}`)
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${environment.APIURL}/products/${productId}`)
  }

}