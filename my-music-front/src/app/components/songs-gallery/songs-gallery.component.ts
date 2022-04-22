import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song.model';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-songs-gallery',
  templateUrl: './songs-gallery.component.html',
  styleUrls: ['./songs-gallery.component.css']
})
export class SongsGalleryComponent implements OnInit {

  songs!:Song[];

  constructor(private songsService:SongsService) { }

  ngOnInit(): void {
    this.songsService.getSongs().subscribe((res) =>this.songs = res);
  }

}
