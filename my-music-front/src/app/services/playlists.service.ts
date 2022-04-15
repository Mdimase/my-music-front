import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  constructor(private http: HttpClient){ }

  getPlaylists() : Observable<Playlist[]> {
    let auth:any = localStorage.getItem('apiKey');  //token JWT
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': auth
      })};
      return this.http.get<Playlist[]>(environment.API_URL + '/playlists',httpOptions);
      
  }

}
