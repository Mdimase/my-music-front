import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

/* clase que se encarga de interceptar request e insertarle el token JWT*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthenticationService) {}

  /*metodo intercept para agregar JWT token en el headers de las request*/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if(this.authService.token != null){
      request = request.clone({
        headers: request.headers.set('Authorization',this.authService.token),
      })
    }
    return next.handle(request);
  }

}
