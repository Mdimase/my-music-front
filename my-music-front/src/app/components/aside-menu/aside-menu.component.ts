import { Component, ElementRef, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { delay, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css']
})
export class AsideMenuComponent{

  email!:string|null;

  constructor(private authService:AuthenticationService,
              private responsiveService:ResponsiveService,
              private observer:BreakpointObserver){
    this.email = this.authService.getEmail();
  }

}
