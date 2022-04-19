import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-playlists-gallery',
  templateUrl: './playlists-gallery.component.html',
  styleUrls: ['./playlists-gallery.component.css']
})
export class PlaylistsGalleryComponent implements OnInit {

  playlists!:Playlist[];

  constructor(private playlistService:PlaylistsService){}

  ngOnInit(): void {
    this.playlistService.getPlaylists().subscribe((res:Playlist[])=>{
      this.playlists = res;
    })
  }

}
