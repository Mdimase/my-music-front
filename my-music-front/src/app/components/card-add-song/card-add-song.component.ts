import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Song } from 'src/app/models/song.model';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { SongsService } from 'src/app/services/songs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-add-song',
  templateUrl: './card-add-song.component.html',
  styleUrls: ['./card-add-song.component.css']
})
export class CardAddSongComponent{

  availableSongs:Song[] = []; //todas las canciones - las que ya posee el playlist

  @Input() idPlaylist!:string;
  @Input() currentSongs!:Song[]; // canciones que posee el playlist
  @Output() addSong = new EventEmitter<Song>();

  constructor(private playlistService:PlaylistsService,private songService:SongsService) { }

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
          resolve('You need to select something!');
        }
      });
    }
  });

  // canciones para agregar de cada genero
  // en formato necesario para sweet modal input select
  availableSongsByGenre(genre:string){
    const songs:any = []; // [{id:idSong1, name:song name 1}, {id:idSOng 2,name: song name 2}, etc]
    this.availableSongs.map((s)=>{
      if(s.genre === genre){
        songs.push({
          id:s.id,
          name:s.name
        });
      }
    });
    return songs.reduce((obj:any, cur:any) => ({...obj, [cur.id]: cur.name}), {})  // {idSong1:songName1, idSong2:songName2, etc}
  }

  //app card agregar cancion a una playlist
  /* primero genero las canciones disponibles y luego el modal */
  async showAddModal(){
    this.songService.getSongs().subscribe(async (allSongs)=> {
      this.availableSongs = allSongs;
      if(this.currentSongs.length !== 0){  //quitar las canciones que ya posee
        let currentsId:string[] = []
        this.currentSongs.map((cs) => currentsId.push(cs.id));
        this.availableSongs = this.availableSongs.filter((s)=>!currentsId.includes(s.id));
      }
      // modal select
      const {value:songId}  = await this.Modal.fire({
        title: 'Add song to the playlist',
        input: 'select',
        position:"top",
        inputOptions: {
          "ROCK":this.availableSongsByGenre("ROCK"),
          "POP":this.availableSongsByGenre("POP"),
          "JAZZ":this.availableSongsByGenre("JAZZ"),
          "FOLK":this.availableSongsByGenre("FOLK"),
          "TECHNO":this.availableSongsByGenre("TECHNO"),
          "CLASSICAL":this.availableSongsByGenre("CLASSICAL"),
        },
        inputPlaceholder: 'Select song name',
      });
      // accion una vez seleccionada la cancion por el usuario
      if(songId){
        this.playlistService.addSong(this.idPlaylist,songId).subscribe(()=>{
          const song:Song = this.availableSongs.filter((s)=>s.id === songId)[0];
          this.addSong.emit(song);
        });
      }
    });
  }
}
