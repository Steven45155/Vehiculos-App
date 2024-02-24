
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { authService } from '../service/auth.service';
import { tap, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class authGuard {
  constructor(
    private authservice:authService,
    private router:Router
     ) { }

}

  const checkAuthentication=(): boolean | Observable<boolean>=>{

    const authservice:authService=inject(authService);
    const router:Router=inject(Router)

    return authservice.checkAuthentication()
    .pipe(
      tap(isAuthentication=>{
        if(!isAuthentication) router.navigate(['./auth'])
      })
    )
  }

export const canActivate:CanActivateFn=( route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
  return checkAuthentication()
}

export const canMatch: CanMatchFn=( route:Route, segmenrs: UrlSegment[])=>{
  return checkAuthentication()
}

