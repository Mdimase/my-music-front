import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  static PLAYLIST_PATH = environment.API_URL + '/playlists';

  constructor(private http: HttpClient){ }

  // todas las playlists del usuario logueado
  getPlaylists() : Observable<Playlist[]> {
    return this.http.get<Playlist[]>(PlaylistsService.PLAYLIST_PATH); 
  }

  updateName(name:string,id:string):Observable<void>{
    const body = {name:name}
    return this.http.put<void>(PlaylistsService.PLAYLIST_PATH + '/playlists/id',body);
  }
  

}
