import { Component, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css']
})
export class AsideMenuComponent{

  @ViewChild(MatSidenav) sidenav!:MatSidenav

  constructor(private observer:BreakpointObserver) { }

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
