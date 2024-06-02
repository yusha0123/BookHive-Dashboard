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
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces';
import { API_URL } from '../constants';
import { extractErrorMessage } from '../helpers';

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

  getProducts(): Observable<Product[]> {
    this.ngxLoader.start();
    return this.http.get<Product[]>(`${API_URL}/books`).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.ngxLoader.stop())
    );
  }

  createProduct(product: Product): Observable<Product> {
    this.ngxLoader.start();
    console.log(product);
    return this.http.post<Product>(`${API_URL}/books`, product).pipe(
      tap(() => this.toastr.info('Product created successfully!')),
      catchError(this.handleError.bind(this)),
      finalize(() => this.ngxLoader.stop())
    );
  }

  updateProduct(product: Product, id: string): Observable<Product> {
    this.ngxLoader.start();
    return this.http.put<Product>(`${API_URL}/books/${id}`, product).pipe(
      tap(() => this.toastr.info('Product updated successfully!')),
      catchError(this.handleError.bind(this)),
      finalize(() => this.ngxLoader.stop())
    );
  }

  deleteProduct(id: string): Observable<DeleteReponse> {
    this.ngxLoader.start();
    return this.http.delete<DeleteReponse>(`${API_URL}/books/${id}`).pipe(
      tap(() => this.toastr.info('Product deleted successfully!')),
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
