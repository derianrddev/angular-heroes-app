import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  CanMatchFn,
  CanActivateFn,
  Router,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
  .pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) router.navigate(['./']);
    }),
    map( isAuthenticated => !isAuthenticated )
  );
};

export const publicCanMatch: CanMatchFn = ( route: Route, urlSegments: UrlSegment[] ) => {
  return checkAuthStatus();
};

export const publicCanActivate: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
  return checkAuthStatus();
}
