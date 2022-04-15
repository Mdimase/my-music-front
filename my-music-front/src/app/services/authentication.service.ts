import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * El servicio de autenticación es utilizado para iniciar o cerrar sesión.
 * *
 * El método login() envía las credenciales del usuario a la API mediante un request de tipo post.
 * Si el login tiene éxito, se almacena localmente el usuario con su JWT.
 *
 * El método logout() elimina el objeto User actual del almacenamiento local.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient){}
  
  //email y password son del body de la request
  login(email: String, password: String):Observable<any>{ 
  return this.http.post<any>(environment.API_URL + '/auth', {email,password} , {observe:'response'})
    .pipe(map(res => {
      //login succesfull con JWT token
      if(res.headers.get("Authorization")){
        //store user details y JWT token in local storage para mantener el usuario logeado
        let r:any = res.headers.get("Authorization"); 
        localStorage.setItem('apiKey',r);
      }
      return res;
    }));
}
  
  //remove user form local storage
  logout() {
    localStorage.removeItem('apiKey');
  }
}
