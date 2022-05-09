import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { environment } from 'src/environments/environment';
import { Song } from '../models/song.model';

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

  // modificar el nombre a una playlist
  updateName(name:string,id:string):Observable<void>{
    return this.http.put<void>(PlaylistsService.PLAYLIST_PATH + '/' + id,{name});
  }

  // crear una nueva playlist sin canciones
  create(name:string):Observable<void>{
    return this.http.post<void>(PlaylistsService.PLAYLIST_PATH,{name});
  }

  // eliminar una playlist y sus canciones
  delete(id:string):Observable<void>{
    return this.http.delete<void>(PlaylistsService.PLAYLIST_PATH + '/' + id);
  }

  // canciones de una playlist
  getSongs(id:string):Observable<any>{
    return this.http.get<any>(PlaylistsService.PLAYLIST_PATH + '/' + id);
  }

  addSong(idPlaylist:string,idSong:string):Observable<any>{
    const url:string = PlaylistsService.PLAYLIST_PATH + '/' + idPlaylist + '/songs';
    return this.http.post<any>(url,{id:idSong});
  }

  removeSong(song:Song,idPlaylist:string):Observable<any>{
    const url:string = PlaylistsService.PLAYLIST_PATH + '/' + idPlaylist + '/songs/' + song.id;
    return this.http.delete<any>(url);
  }

}
