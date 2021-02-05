import { Injectable } from '@angular/core';
import { Product } from '../products/product.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, shareReplay, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://storerestservice.azurewebsites.net/api/products/';
  products$: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.initProducts();
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  initProducts() {
    let url:string = this.baseUrl + `?$orderby=ModifiedDate%20desc`;
    this.products$ = this
                      .http
                      .get<Product[]>(url)
                      .pipe(
                        delay(1500),
                        tap(console.table),
                        shareReplay()
                      );
  }

}
