import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  email!:string|null;

  clicked:boolean=false;

  constructor(private authenticationService:AuthenticationService,
    private router:Router){
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
