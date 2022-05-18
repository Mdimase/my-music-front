import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly TOKEN = 'apiKey';

  constructor(private http: HttpClient){}

  get token(){
    return localStorage.getItem(this.TOKEN);
  }

  getEmail(){
    return localStorage.getItem('email');
  }
  
  // si el login es exitoso almaceno el token en el local storage
  // sino envio un mensaje de error
  login(email:string,password:string):Observable<any>{ 
    return this.http.post<any>(environment.API_URL + '/auth', {email,password}  ,  {observe:'response'})
      .pipe(map((res:any) => { //mapea la respuesta http a la variable res
        const token = res.headers.get("Authorization");
        if(token){
          localStorage.setItem(this.TOKEN,token);
          localStorage.setItem('email',email);
        }
        return res;
      }));
  }
  
  //remove user form local storage
  logout() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem('email');
  }
}
