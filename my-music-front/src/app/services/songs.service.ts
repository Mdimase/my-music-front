import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  genres:string[] = ['ROCK','POP','TECHNO','JAZZ','FLOK','CLASSICAL'];  

  constructor(private http:HttpClient){
    
  }

  // devuelve la ruta hacia la img segun el genero
  getImg(genre:string):string{
    let ruta:string = "../../../assets/";
    if(genre === 'ROCK'){
      ruta += "fondo-rock.jpg";
    }else if(genre === 'POP'){
      ruta += 'fondo-pop.jpg';
    }else if(genre === 'FOLK'){
      ruta += 'fondo-folk.jpg';
    }else if(genre === 'JAZZ'){
      ruta += "fondo-jazz.jpg";
    }else if(genre === 'TECHNO'){
      ruta += "tecno-fondo.jpg";
    }else if(genre === 'CLASSICAL'){
      ruta += 'fondo-clasica.jpg';
    }
    return ruta;
  }

  getSongs():Observable<Song[]>{
    return this.http.get<Song[]>(environment.API_URL + '/songs');
  }

  getSongsByAuthor(author:string):Observable<Song[]>{
    return this.http.get<Song[]>(environment.API_URL + '/songs?author=' + author);
  }

  getSongsByGenre(genre:string):Observable<Song[]>{
    return this.http.get<Song[]>(environment.API_URL + '/songs?genre=' + genre);
  }

  getSongsByAuthorAndGenre(author:string,genre:string):Observable<Song[]>{
    return this.http.get<Song[]>(environment.API_URL + '/songs?author=' + author + '&&genre=' + genre);
  }


}
