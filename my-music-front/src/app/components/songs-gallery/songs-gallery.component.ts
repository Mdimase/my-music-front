import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Song } from 'src/app/models/song.model';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-songs-gallery',
  templateUrl: './songs-gallery.component.html',
  styleUrls: ['./songs-gallery.component.css']
})
export class SongsGalleryComponent implements OnInit {

  songs!:Song[];
  filterForm!:FormGroup;
  genres!:string[];
  authorTag:boolean = false;  // flag para habilitar el renderizado del tag de author filtrado
  genreTag:boolean = false;  // flag para habilitar el renderizado del tag de genre filtrado
  authorInput!:string;  // author ingresado por usuario para filtrar
  genreInput!:string;   // genre ingresado por usuario para filtrar

  constructor(private songsService:SongsService,private formBuilder: FormBuilder){
    this.filterForm = this.initForm();
    this.genres = this.songsService.genres;
  }

  ngOnInit(): void {
    this.songsService.getSongs().subscribe((res) =>this.songs = res);
  }

  initForm():FormGroup{
    return this.formBuilder.group({
      author: [""],
      genre:[""]
    });
  }

  /* filtrado de canciones */
  onSubmit():void{
    const author:string = this.filterForm.get('author')?.value;
    const genre:string = this.filterForm.get('genre')?.value;
    if(genre != "" && author == ""){ //only genre
      this.songsService.getSongsByGenre(genre).subscribe((res)=>this.songs = res);  //obtengo las canciones por genre
      this.genreInput = this.filterForm.get('genre')?.value;  //guardo el input del usuario
      this.genreTag = true;  // habilito el tag de genre
      this.authorTag = false;  // deshabilito el tag de author
    }
    else if(author != "" && genre == ""){ //only author
      this.songsService.getSongsByAuthor(author.toLowerCase()).subscribe((res)=> this.songs = res);  //obtengo las canciones por author
      this.authorInput = this.filterForm.get('author')?.value;  // guardo el input del usuario
      this.authorTag = true;  // habilito el tag de usuario
      this.genreTag = false;  //deshabilito el tag de genre
    }
    else if(author != "" && genre != ""){ //both
      this.songsService.getSongsByAuthorAndGenre(author.toLowerCase(),genre).subscribe((res)=> this.songs = res);  //obtengo las canciones por genre y author
      this.authorInput = this.filterForm.get('author')?.value;  // guardo el input del usuario
      this.genreInput = this.filterForm.get('genre')?.value;  //guardo el input del usuario
      this.authorTag = true;  // habilito el tag de usuario
      this.genreTag = true;  // habilito el tag de genre
    }
  }

}
