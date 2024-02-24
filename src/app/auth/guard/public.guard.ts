
import { Injectable, inject } from '@angular/core';
import { Observable, map, observable, tap } from 'rxjs';
import { authService } from '../service/auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';

@Injectable({providedIn: 'root'})
export class publicGuard {
  constructor() { }
}

const checAuthentiction=(): boolean | Observable<boolean>=>{

  const authservice:authService=inject(authService);
  const router:Router=inject(Router)

  return authservice.checkAuthentication()
  .pipe(
    tap( isAuthentication=>{
      if( !isAuthentication ) router.navigate(['./auth/login'])
    })
  )
}

export const canActivate2:CanActivateFn=( route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
  return checAuthentiction()
}

export const canMatch2:CanMatchFn=( route: Route, segments:UrlSegment[])=>{
  return checAuthentiction()
}
