import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { API_URL } from '../constants';
import { LoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.initializeAuthState();
  }

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private loggedUser?: string;

  private initializeAuthState() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.next(true);
    }
  }

  login(user: {
    username: string;
    password: string;
  }): Observable<LoginResponse> {
    this.ngxLoader.start();
    return this.httpClient
      .post<LoginResponse>(`${API_URL}/admin/login`, user)
      .pipe(
        tap((response) => this.handleSuccess(user.username, response)),
        catchError((error) => {
          const errorMessage = this.extractErrorMessage(error);
          this.toastr.error(errorMessage);
          return throwError(() => new Error(error));
        }),
        finalize(() => this.ngxLoader.stop())
      );
  }

  private handleSuccess(username: string, response: LoginResponse) {
    this.loggedUser = username;
    this.router.navigate(['/']);
    localStorage.setItem(
      'token',
      JSON.stringify({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        username: username,
      })
    );
    this.isAuthenticated.next(true);
  }

  getAuthState(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      return error.error.message;
    } else {
      // Server-side error
      return error.error.message || 'An unknown error occurred!';
    }
  }
}