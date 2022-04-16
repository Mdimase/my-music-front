import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PlaylistsService } from '../../services/playlists.service';
import { Playlist } from '../../models/playlist.model';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  playlists!: Playlist[];

  constructor(private route:ActivatedRoute, 
    private playlistsService:PlaylistsService){}

  ngOnInit(): void {
    this.playlistsService.getPlaylists().subscribe((res: any) =>{
      this.playlists = res;
    });
  }
}
