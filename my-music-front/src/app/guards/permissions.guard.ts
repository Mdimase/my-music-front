import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {

  constructor(private authService:AuthenticationService, private router:Router, private alertService:AlertService){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.token){
      return true;
    }
    this.alertService.toastError('You don`t hace access to this page');
    this.router.navigate(['auth']);
    return false;
  }
  
}
