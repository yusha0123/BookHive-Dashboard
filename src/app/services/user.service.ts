import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { API_URL } from '../constants';
import { extractErrorMessage } from '../helpers';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService
  ) {}

  getUsers(): Observable<User[]> {
    this.ngxLoader.start();
    return this.http.get<User[]>(`${API_URL}/users`).pipe(
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
