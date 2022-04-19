import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PlaylistsService } from '../../services/playlists.service';
import { Playlist } from '../../models/playlist.model';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  playlists!: Playlist[];

  constructor(private route:ActivatedRoute, 
              private playlistsService:PlaylistsService,
              private observer:BreakpointObserver){}

  ngOnInit(): void {
    this.playlistsService.getPlaylists().subscribe((res: any) =>{
      this.playlists = res;
    });
  }

  /* habilitida/deshablita el menu responsive*/
  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){ //pantalla pc
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }else{  //pantalla cel-tablet
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }
}
