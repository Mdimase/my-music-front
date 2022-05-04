import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { Song } from 'src/app/models/song.model';
import { PlaylistsService } from 'src/app/services/playlists.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css']
})
export class CardAddComponent implements OnInit {

  @Input() isPlaylist!:boolean; //flag para diferenciar entre una card-add playlist de una card-add songs
  @Output() newPlaylist = new EventEmitter<Playlist[]>();
  @Output() addSong = new EventEmitter<Song>();

  constructor(private playlistService:PlaylistsService) { }

  ngOnInit(): void {
  }

  /* modal base*/
  Modal = Swal.mixin({
    input: 'text',
    confirmButtonText:'Add',
    confirmButtonColor:'rgb(0,115,255)',
    allowOutsideClick:false,
    showCloseButton:true,
    allowEscapeKey:false,
    inputValidator: (value) => {  // prohibo que ingrese un campo vacio
      return new Promise<string>((resolve) => {
        if (value !== '') {
          resolve('');
        }else {
          resolve('You need to write something!');
        }
      });
    }
  });

  async showAddModal():Promise<void>{
    if(this.isPlaylist){
      /* modal add Playlist*/
      const { value: name } = await this.Modal.fire({
        title: 'New playlist',
        inputLabel: 'insert the new playlist name',
        inputPlaceholder: 'Playlist Name',
      });
      /*accion cuando se clickea el boton create*/
      if(name){
        this.playlistService.create(name).subscribe(()=>{
          this.playlistService.getPlaylists().subscribe((res) => this.newPlaylist.emit(res));
      });
      } 
    } else{ //app card agregar cancion a una playlist
      console.log("add song");
    }
  }
}
