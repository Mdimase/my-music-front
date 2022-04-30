import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { PlaylistsService } from 'src/app/services/playlists.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css']
})
export class CardAddComponent implements OnInit {

  @Output() newPlaylist = new EventEmitter<Playlist[]>();

  constructor(private playlistService:PlaylistsService) { }

  ngOnInit(): void {
  }

  /* modal para que el usuario ingrese el nombre de la nueva playlist */

  async showAddModal():Promise<void>{
    /* modal */
    const { value: name } = await Swal.fire({
      title: 'New playlist',
      input: 'text',
      inputLabel: 'insert the new playlist name',
      inputPlaceholder: 'Playlist Name',
      confirmButtonText:'Create',
      confirmButtonColor:'rgb(0,115,255)',
      allowOutsideClick:false,
      showCloseButton:true,
      allowEscapeKey:false,
      inputValidator: (value) => {  // prohibo que ingrese un campo vacio
        return new Promise<string>((resolve) => {
          if (value !== '') {
            resolve('');
          } else {
            resolve('You need to write something!');
          }
        })
      }
    })
    /*accion cuando se clickea el boton create*/
    if(name){
      this.playlistService.create(name).subscribe(()=>{
        this.playlistService.getPlaylists().subscribe((res) => {
          this.newPlaylist.emit(res);
        });
      });
    } 
  }
}
