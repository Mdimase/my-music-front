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

  // todas las playlists del usuario logueado
  getPlaylists() : Observable<Playlist[]> {
    return this.http.get<Playlist[]>(environment.API_URL + '/playlists'); 
  }

  

}
