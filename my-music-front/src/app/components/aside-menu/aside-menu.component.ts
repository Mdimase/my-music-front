import { Component, ElementRef, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { delay, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css']
})
export class AsideMenuComponent{

  email!:string|null;

  constructor(private authService:AuthenticationService,
              private observer:BreakpointObserver,
              private router:Router){
    this.email = this.authService.getEmail();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['auth']);
  }

}
