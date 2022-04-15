import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PlaylistsService } from '../../services/playlists.service';
import { Observable } from 'rxjs';
import { Playlist } from '../../models/playlist.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  playlists!: Playlist[];

  constructor(private route:ActivatedRoute, 
    private playlistsService:PlaylistsService, 
    private authenticationService:AuthenticationService,
    private router:Router){}

  ngOnInit(): void {
    this.playlistsService.getPlaylists().subscribe((res: any) =>{
      this.playlists = res;
    });
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['auth']);
  }

}
