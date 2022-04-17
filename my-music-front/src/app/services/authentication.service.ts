import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, shareReplay } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private readonly TOKEN = 'apiKey';

  private email$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient){}

  get token(){
    return localStorage.getItem(this.TOKEN);
  }

   /*devuelve el email como un observable singleton*/ 
   getEmail$():Observable<string>{
    return this.email$.asObservable().pipe(shareReplay());
  }

  setEmail$(email:string):void{
    this.email$.next(email);
  }
  
  // si el login es exitoso almaceno el token en el local storage
  // sino envio un mensaje de error
  login(email:string,password:string):Observable<any>{ 
    return this.http.post<any>(environment.API_URL + '/auth', {email,password}  ,  {observe:'response'})
      .pipe(map((res:any) => { //mapea la respuesta http a la variable res
        const token = res.headers.get("Authorization");
        if(token){
          localStorage.setItem(this.TOKEN,token);
        }
        return res;
      }));
  }
  
  //remove user form local storage
  logout() {
    localStorage.removeItem(this.TOKEN);
  }
}
