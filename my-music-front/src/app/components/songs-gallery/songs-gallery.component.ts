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

  constructor(private songsService:SongsService,private formBuilder: FormBuilder){
    this.filterForm = this.initForm();
    this.genres = this.songsService.genres;
  }

  ngOnInit(): void {
    this.songsService.getSongs().subscribe((res) =>this.songs = res);
  }

  initForm():FormGroup{
    return this.formBuilder.group({
      author: [''],
      genre:['']
    });
  }

  onSubmit():void{
    const author:string = this.filterForm.get('author')?.value;
    const genre:string = this.filterForm.get('genre')?.value;
    if(genre != null && !author){
      this.songsService.getSongsByGenre(genre).subscribe((res)=>this.songs = res);
    }
    else if(author != null && !genre){
      this.songsService.getSongsByAuthor(author.toLowerCase()).subscribe((res)=> this.songs = res);
    }
    else {
      this.songsService.getSongsByAuthorAndGenre(author.toLowerCase(),genre).subscribe((res)=> this.songs = res);
    }
  }

}
