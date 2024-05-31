import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const unAuthenticated: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isAuthenticated;

  authService.getAuthState().subscribe((value) => {
    isAuthenticated = value;
  });

  if (isAuthenticated) {
    router.navigate(['/']);
    return false;
  }
  return true;
};