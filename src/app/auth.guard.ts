import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ScoutloginServiceService } from './scoutlogin-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth: ScoutloginServiceService,
    private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isLoggedIn){
      return true
    }
    this.auth.isLog().subscribe(res => {
      console.log(res)
      if (res.status) {
        this.auth.setLoggedIn(true)
        return true
      } else {
        this.router.navigate(['login'])
        return false
      }
    })
  }
  
}
