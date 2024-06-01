import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, Subject, tap, finalize } from 'rxjs';
import { Product } from '../interfaces';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService
  ) {}

  private refreshProductsSubject = new Subject<void>();

  refreshProducts$ = this.refreshProductsSubject.asObservable();

  getProducts(): Observable<Product[]> {
    this.ngxLoader.start();
    return this.http
      .get<Product[]>(`${API_URL}/books`)
      .pipe(finalize(() => this.ngxLoader.stop()));
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/admin/books`, product).pipe(
      tap(() => this.refreshProductsSubject.next()),
      finalize(() => this.ngxLoader.stop())
    );
  }
}
