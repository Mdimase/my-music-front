import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  static readonly PLAYLIST_PATH = environment.API_URL + '/playlists';

  constructor(private http: HttpClient){ }

  // todas las playlists del usuario logueado
  getPlaylists() : Observable<Playlist[]> {
    return this.http.get<Playlist[]>(PlaylistsService.PLAYLIST_PATH); 
  }

  updateName(name:string,id:string):Observable<void>{
    return this.http.put<void>(PlaylistsService.PLAYLIST_PATH + '/' + id,{name});
  }

  create(name:string):Observable<void>{
    return this.http.post<void>(PlaylistsService.PLAYLIST_PATH,{name});
  }

}
