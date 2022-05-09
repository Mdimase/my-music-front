import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from 'src/app/models/song.model';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { SongsService } from 'src/app/services/songs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  idPlaylist!:string; 
  @Input() editable!:boolean; // flag para determinar si es una card editable
  @Input() song!:Song;
  @Output() deleteSong = new EventEmitter<Song>();
  @ViewChild('img') img!:ElementRef;  // referencia al elemento <img> para setearle el src

  constructor(private songService:SongsService,private playlistService:PlaylistsService, private activatedRoute:ActivatedRoute){ }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p) => this.idPlaylist = p['id']);
  }

  /*seteo src de img segun genero*/
  ngAfterViewInit(){
    this.img.nativeElement.src = this.songService.getImg(this.song.genre);
  }

  /* modal para confirmar la eliminacion de una song de un playlist */
  showDeleteModal(){
    /* modal de confirmacion */
    Swal.fire({
      title: 'Are you sure?',
      text:'remove this song from this playlist?',
      icon: 'warning',
      iconColor:'#d33',
      showCancelButton: true,
      allowOutsideClick:false,
      showCloseButton:true,
      allowEscapeKey:false,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText:'No'
    }).then((result) => {  
      if(result.isConfirmed){// confirmacion realizada, presiono el boton delete
        this.playlistService.removeSong(this.song,this.idPlaylist).subscribe(()=>{
          this.deleteSong.emit(this.song);
        });
      }
    })
  }

}
