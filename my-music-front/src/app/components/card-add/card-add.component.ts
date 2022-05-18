import { Component, EventEmitter, Output } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { PlaylistsService } from 'src/app/services/playlists.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css']
})
export class CardAddComponent{

  @Output() newPlaylist = new EventEmitter<Playlist[]>();

  constructor(private playlistService:PlaylistsService){}

  /* modal base*/
  Modal = Swal.mixin({
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

  async showAddModal(){
    /* modal add Playlist*/
    const { value: name } = await this.Modal.fire({
      title: 'New playlist',
      input: 'text',
      inputLabel: 'insert the new playlist name',
      inputPlaceholder: 'Playlist Name',
    });
    /*accion cuando se clickea el boton add*/
    if(name){
      this.playlistService.create(name).subscribe(()=>{
        this.playlistService.getPlaylists().subscribe((res) => this.newPlaylist.emit(res));
      });
    }
  }

}
