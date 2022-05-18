import { Component} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css']
})
export class AsideMenuComponent{

  email!:string|null;

  constructor(private authService:AuthenticationService, private router:Router){
    this.email = this.authService.getEmail();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['auth']);
  }

}
