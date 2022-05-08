import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  /* interceptor que evalua los response, en caso de encontrar errores los trata
     verifica errores de autorizacion como 401 y 403
                      recurso no encontrado como 404
     se puede agregar mas errores en el futuro facilmente
  */

  constructor(private authenticationService: AuthenticationService, private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(  
      catchError((e) => {
        if(e.status === 401 || e.status === 403){  //unauthorized
          this.authenticationService.logout();
          //location.reload();
        }
        if(e.status === 404){
          this.router.navigate(['/error']);
        } 
        const error = new Error(e.message);
        console.log("interceptor => " + error);
        return throwError(()=>error);
      })
    )
  }

}
