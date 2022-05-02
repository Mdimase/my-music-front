import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Playlist } from 'src/app/models/playlist.model';
import { AlertService } from 'src/app/services/alert.service';
import { PlaylistsService } from 'src/app/services/playlists.service';
import Swal from 'sweetalert2';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';

@Component({
  selector: 'app-card-playlist',
  templateUrl: './card-playlist.component.html',
  styleUrls: ['./card-playlist.component.css']
})
export class CardPlaylistComponent implements OnInit {

  @Input() name!:string;
  @Input() id!:string;
  @Output() updatePlaylist = new EventEmitter<Playlist>();
  @Output() deletePlaylist = new EventEmitter<Playlist>();

  constructor(private playlistService:PlaylistsService,private alertService:AlertService,private router:Router) { }

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
      this.playlistService.updateName(name,this.id).subscribe();
      this.updatePlaylist.emit(new Playlist(this.id,name));
    } 
  }

  /* modal para confirmar la eliminacion de una playlist */
  showDeleteModal(){
    /* modal de confirmacion */
    Swal.fire({
      title: 'Are you sure?',
      text:'delete this playlist with its songs?',
      icon: 'warning',
      iconColor:'#d33',
      showCancelButton: true,
      allowOutsideClick:false,
      showCloseButton:true,
      allowEscapeKey:false,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText:'No'
    }).then((result) => {  
      if(result.isConfirmed){// confirmacion realizada, presiono el boton delete
        this.playlistService.delete(this.id).subscribe();
        this.deletePlaylist.emit(new Playlist(this.id,this.name));
      }
    })
  }

}
