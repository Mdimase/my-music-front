import { BreakpointObserver } from '@angular/cdk/layout';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
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
  xxl:boolean = false;  // xxl breakpoint 1600px
  page!:number; // page actual de la paginacion
  authorTag:boolean = false;  // flag para habilitar el renderizado del tag de author filtrado
  genreTag:boolean = false;  // flag para habilitar el renderizado del tag de genre filtrado
  authorInput!:string;  // author ingresado por usuario para filtrar
  genreInput!:string;   // genre ingresado por usuario para filtrar

  constructor(private songsService:SongsService,private formBuilder: FormBuilder, private observer:BreakpointObserver){
    this.filterForm = this.initForm();
    this.genres = this.songsService.genres;
  }

  /* por defecto carga todas las canciones */
  ngOnInit(): void {
    this.songsService.getSongs().subscribe((res) =>this.songs = res);
  }

  /* habilitida/deshablita el breakpoint xxl del grid gallery*/
  ngAfterViewInit(){
    this.observer.observe(['(min-width: 1600px)']).subscribe((res)=>{
      if(res.matches){ 
        this.xxl = true;
      }else{
        this.xxl = false;
      }
    });
  }

  initForm():FormGroup{
    return this.formBuilder.group({
      author: [""],
      genre:[""]
    });
  }

  /* cancelar el filtro y volver a renderizar las canciones */
  onDefault(author:string,genre:string,toDelete:string):void{
    if((genre != "" && !author)||(author != "" && !genre)){ //deshacer un filtro unico
      this.songsService.getSongs().subscribe((res) =>this.songs = res);
      this.filterForm.reset({author:"",genre:""});
      this.authorInput = "";
      this.genreInput = "";
      this.authorTag = false;
      this.genreTag = false;
    }
    else if(toDelete === 'AUTHOR'){  // del filtro doble elimino author -> permanece con filtro por genre
      this.songsService.getSongsByGenre(genre).subscribe((res)=>this.songs = res);
      this.filterForm.reset({author:"",genre:genre});
      this.authorInput = "";
      this.authorTag = false;
    }
    else if(toDelete === 'GENRE'){   // del filtro doble elimino genre -> permanece con filtro por author
      this.songsService.getSongsByAuthor(author.toLowerCase()).subscribe((res)=> this.songs = res);
      this.filterForm.reset({author:author,genre:""}); 
      this.genreInput = "";
      this.genreTag = false;
    }
  }

  /* filtrado de canciones */
  onSubmit():void{
    const author:string = this.filterForm.get('author')?.value;
    const genre:string = this.filterForm.get('genre')?.value;
    if(genre != "" && author == ""){ //only genre
      this.songsService.getSongsByGenre(genre).subscribe((res)=>this.songs = res);
      this.genreInput = genre;
      this.genreTag = true;  
      this.authorTag = false;  
    }
    else if(author != "" && genre == ""){ //only author
      this.songsService.getSongsByAuthor(author.toLowerCase()).subscribe((res)=> this.songs = res);  
      this.authorInput = author;
      this.authorTag = true; 
      this.genreTag = false; 
    }
    else if(author != "" && genre != ""){ //both
      this.songsService.getSongsByAuthorAndGenre(author.toLowerCase(),genre).subscribe((res)=> this.songs = res);
      this.authorInput = author;
      this.genreInput = genre; 
      this.genreTag = true;
      this.authorTag = true; 
    }
  }

}
