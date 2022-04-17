import { Component, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { delay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css']
})
export class AsideMenuComponent{

  email!:string;

  @ViewChild(MatSidenav) sidenav!:MatSidenav

  constructor(private observer:BreakpointObserver,private authService:AuthenticationService){
    this.authService.getEmail$().subscribe((email:string)=>this.email=email);
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){ //pantalla pc
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }else{  //pantalla cel
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }

}
