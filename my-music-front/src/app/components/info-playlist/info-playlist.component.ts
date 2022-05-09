import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from 'src/app/models/song.model';
import { AlertService } from 'src/app/services/alert.service';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-info-playlist',
  templateUrl: './info-playlist.component.html',
  styleUrls: ['./info-playlist.component.css']
})
export class InfoPlaylistComponent implements OnInit {

  songs:Song[] = [];
  xxl:boolean = false;  // xxl breakpoint 1600px
  id!:string;
  playlistName!:string;

  constructor(private playlistService:PlaylistsService,private activatedRoute:ActivatedRoute,
              private alertService:AlertService, private observer:BreakpointObserver) { }

  ngOnInit(): void{
    this.activatedRoute.queryParams.subscribe((pn) => this.playlistName = pn['playlistName']);
    this.activatedRoute.params.subscribe((p) => this.id = p['id']);
    this.playlistService.getSongs(this.id).subscribe((res)=> this.songs = res.songs);
  }

   /* habilitida/deshablita el breakpoint xxl del grid gallery*/
   ngAfterViewInit(){
    this.observer.observe(['(min-width: 1600px)']).subscribe((res)=>{
      if(res.matches){ 
        this.xxl = true;
      }else{
        this.xxl = false;
      }
    });
  }

  // agregar cancion a la lista en memoria de canciones de esta playlist
  addSong(song:Song):void{
    this.songs.push(song);
    this.alertService.success("Song added succesfully");
  }

  deleteSong(song:Song):void{
    this.songs = this.songs.filter((s)=>s.id !== song.id);
    this.alertService.success("Song removed succesfully");
  }

}
