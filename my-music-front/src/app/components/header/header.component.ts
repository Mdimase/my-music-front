import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute,Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  @Input() responsive:boolean=false;
  email!:string|null;
  clicked:boolean=false;

  constructor(private authenticationService:AuthenticationService,
              private observer:BreakpointObserver,
              private router:Router,
              private route:ActivatedRoute){
      this.email = this.authenticationService.getEmail();
  }

  // switch flag
  onClick(){
    if(!this.clicked){
      this.clicked=true;
    }
    else{
      this.clicked=false;
    }
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['auth']);
  }

}
