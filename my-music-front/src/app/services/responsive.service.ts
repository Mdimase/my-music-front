import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, shareReplay, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  sidenav$=new Subject<MatSidenav>();

  constructor() { }

  getSidenav$():Observable<MatSidenav>{
    return this.sidenav$.asObservable();
  }

  setSidenav$(side:MatSidenav){
    this.sidenav$.next(side);
  }

}
