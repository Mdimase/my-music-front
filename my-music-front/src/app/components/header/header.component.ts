import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  clicked:boolean=false;

  constructor(private authenticationService:AuthenticationService,
    private router:Router) { }

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
