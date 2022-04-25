import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PlaylistsService } from 'src/app/services/playlists.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-playlist',
  templateUrl: './card-playlist.component.html',
  styleUrls: ['./card-playlist.component.css']
})
export class CardPlaylistComponent implements OnInit {

  @Input() name!:string;
  @Input() id!:string;

  constructor(private playlistService:PlaylistsService) { }

  ngOnInit(): void {
  }

  /* modal para que el usuario ingrese el nuevo nombre de una playlist */
  /* funciona con una promesa asincrona que se resuelve cuando se presiona el boton update */
  async showUpdateModal():Promise<void>{
    /* modal */
    const { value: name } = await Swal.fire({
      title: 'Update playlist name',
      input: 'text',
      inputLabel: 'insert the new playlist name',
      inputPlaceholder: 'Playlist Name',
      confirmButtonText:'Update',
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
    /*accion cuando se clickea el boton update*/
    if(name){
      Swal.fire(`New Name: ${name}`)
    } 
  }

}
