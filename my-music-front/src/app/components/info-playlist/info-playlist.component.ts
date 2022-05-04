import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from 'src/app/models/song.model';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-info-playlist',
  templateUrl: './info-playlist.component.html',
  styleUrls: ['./info-playlist.component.css']
})
export class InfoPlaylistComponent implements OnInit {

  songs:Song[] = [];
  id!:string;
  playlistName!:string;

  constructor(private playlistService:PlaylistsService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void{
    this.activatedRoute.queryParams.subscribe((pn) => this.playlistName = pn['playlistName']);
    this.activatedRoute.params.subscribe((p) => this.id = p['id']);
    this.playlistService.getSongs(this.id).subscribe((res)=> this.songs = res.songs);
  }

  // agregar una cancion a una playlist
  addSong(song:Song):void{
    // TO DO
    console.log("agregado");
  }


}
