import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  static readonly SIGNUP_PATH = environment.API_URL + '/signup';

  constructor(private http: HttpClient) { }

  addNewUser(email:string, password:string):Observable<void>{
    return this.http.post<void>(SignupService.SIGNUP_PATH, {email, password});
  }
}
