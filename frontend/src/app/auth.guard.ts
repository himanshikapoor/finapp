import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)
  let toast = inject(HotToastService)

  if (authService.isAuthenticated()) {
    return true;
  }

  toast.warning('Please log in to access this page.')
  router.navigate(['/login']);
  return false;
};
