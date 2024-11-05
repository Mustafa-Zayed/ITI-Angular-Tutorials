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

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      }),
    };
  }

  private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Write error details in Generic error log
    // may be an API call or a DB call to retrieve error details

    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Error occured, please try again'));
  }

  getProductIds(): number[] {
    let prdIds: number[] = [];
    this.getAllProducts().subscribe((prdArr) =>
      prdArr.map((prd) => prdIds.push(prd.id))
    );

    return prdIds;
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient
      .get<IProduct[]>(`${environment.APIURL}/products`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient
      .get<ICategory[]>(`${environment.APIURL}/categories`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProductsByCategoryId(categoryId: number): Observable<IProduct[]> {
    if (categoryId == 0) return this.getAllProducts();

    return this.httpClient
      .get<IProduct[]>(
        `${environment.APIURL}/products?categoryID=${categoryId}`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.httpClient
      .get<IProduct>(`${environment.APIURL}/products/${productId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient
      .post<IProduct>(
        `${environment.APIURL}/products`,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.put<IProduct>(
      `${environment.APIURL}/products`,
      JSON.stringify(product),
      this.httpOptions
    );
  }

  deleteProduct(productId: number): Observable<IProduct> {
    return this.httpClient.delete<IProduct>(
      `${environment.APIURL}/products/${productId}`,
      this.httpOptions
    );
  }
}
