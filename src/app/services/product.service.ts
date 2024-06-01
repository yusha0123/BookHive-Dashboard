import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  Observable,
  Subject,
  tap,
  finalize,
  catchError,
  throwError,
} from 'rxjs';
import { Product } from '../interfaces';
import { API_URL } from '../constants';
import { extractErrorMessage } from '../helpers';
import { ToastrService } from 'ngx-toastr';

interface DeleteReponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService
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
    this.ngxLoader.start();
    return this.http.post<Product>(`${API_URL}/admin/books`, product).pipe(
      tap(() => this.refreshProductsSubject.next()),
      catchError(this.handleError.bind(this)),
      finalize(() => this.ngxLoader.stop())
    );
  }

  updateProduct(product: Product): Observable<Product> {
    this.ngxLoader.start();
    return this.http
      .put<Product>(`${API_URL}/admin/books/${product._id}`, product)
      .pipe(
        tap(() => this.refreshProductsSubject.next()),
        catchError(this.handleError.bind(this)),
        finalize(() => this.ngxLoader.stop())
      );
  }

  deleteProduct(product: Product): Observable<DeleteReponse> {
    this.ngxLoader.start();
    return this.http
      .put<DeleteReponse>(`${API_URL}/admin/books/${product._id}`, product)
      .pipe(
        tap(() => this.refreshProductsSubject.next()),
        catchError(this.handleError.bind(this)),
        finalize(() => this.ngxLoader.stop())
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    //we are not handling 401 & 403 errors since it will be handled by interceptors
    if (error.status !== 401 && error.status !== 403) {
      const errorMessage = extractErrorMessage(error);
      this.toastr.error(errorMessage);
    }
    return throwError(() => new Error(error.message));
  }
}
