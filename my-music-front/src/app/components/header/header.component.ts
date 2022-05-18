import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute,Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  @Input() responsive:boolean=false;

  constructor(){
  }

}
