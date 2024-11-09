import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Models/iproduct';
import { APIResponseViewModel } from '../ViewModels/apiresponse-view-model';

@Injectable({
  providedIn: 'root',
})
export class GenericAPIHandlerService {
  httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      }),
    };
  }

  // When an API needs an access token, use this to add the token to the header
  private setHeaders(key: string, value: string) {
    this.httpOptions.headers.set(key, value);
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

  getAll<T>(endPoint: string): Observable<T> {
    return this.httpClient
      .get<T>(`${environment.APIURL}/${endPoint}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProductsByCategoryId(categoryId: number): Observable<IProduct[]> {
    if (categoryId == 0) return this.getAll('products');

    return this.httpClient
      .get<IProduct[]>(
        `${environment.APIURL}/products?categoryID=${categoryId}`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  // The best practice is all methods should return an Observable<APIResponseViewModel>
  // instead of an Observable<T> to standardize the response format.
  // Respository design pattern
  getItems(
    endPoint: string,
    queryParams: { [key: string]: any } = {}
  ): Observable<APIResponseViewModel> {
    const url = `${environment.APIURL}/${endPoint}`;
    const params = new HttpParams({ fromObject: queryParams });

    if (params.keys()[0] == 'categoryID' && params.get('categoryID') == '0')
      return this.httpClient.get<APIResponseViewModel>(url).pipe(
        map(
          (apiResult) =>
            ({
              success: true,
              data: apiResult,
              messages: [],
            } as APIResponseViewModel)
        ),
        catchError((error) =>
          of({
            success: false,
            data: null,
            messages: [error.message || 'An error occurred'],
          } as APIResponseViewModel)
        )
      );

    return this.httpClient.get<APIResponseViewModel>(url, { params }).pipe(
      map(
        (apiResult) =>
          ({
            success: true,
            data: apiResult,
            messages: [],
          } as APIResponseViewModel)
      ),
      catchError((error) =>
        of({
          success: false,
          data: null,
          messages: [error.message || 'An error occurred'],
        } as APIResponseViewModel)
      )
    );
  }

  getById<T>(endPoint: string, id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${environment.APIURL}/${endPoint}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  post<T>(endPoint: string, data: any): Observable<T> {
    return this.httpClient
      .post<T>(
        `${environment.APIURL}/${endPoint}`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  put<T>(endPoint: string, data: any): Observable<T> {
    return this.httpClient
      .put<T>(
        `${environment.APIURL}/${endPoint}/${data.id}`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  delete<T>(endPoint: string, id: number): Observable<T> {
    return this.httpClient
      .delete<T>(`${environment.APIURL}/${endPoint}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
