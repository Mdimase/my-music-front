import { Component, EventEmitter, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { AlertService } from 'src/app/services/alert.service';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-playlists-gallery',
  templateUrl: './playlists-gallery.component.html',
  styleUrls: ['./playlists-gallery.component.css']
})
export class PlaylistsGalleryComponent implements OnInit {

  playlists!:Playlist[];

  constructor(private playlistService:PlaylistsService, private alertService:AlertService){}

  ngOnInit(): void {
    this.playlistService.getPlaylists().subscribe((res:Playlist[])=>{
      this.playlists = res;
    })
  }

  /* modificar la playlist de la coleccion en memoria */
  updatePlaylist(playlist:Playlist):void{
    this.playlists.map(p => {
      if(p.id === playlist.id){
        p.name = playlist.name;
      }
    });
    this.alertService.success('playlist name updated succesfully');
  }

  /* agregar la nueva playlist a la coleccion en memoria */
  /* reemplaza toda la coleccion por la actualizada */
  newPlaylist(playlists:Playlist[]):void{
    this.playlists = playlists;
    this.alertService.success("Playlist created succesfully");
  }

  /* eliminar playlist de la coleccion en memoria */
  deletePlaylist(playlist:Playlist):void{
    this.playlists = this.playlists.filter((p) => p.id !== playlist.id);
    this.alertService.success("Song added succesfully");
  }

}
