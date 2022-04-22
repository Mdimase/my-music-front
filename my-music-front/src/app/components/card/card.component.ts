import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() name!:string;
  @Input() author!:string;
  @Input() genre!:string;
  @ViewChild('img') img!:ElementRef;  // referencia al elemento <img> para setearle el src

  constructor(private songService:SongsService){ }

  ngOnInit(): void {
  }

  /*seteo src de img segun genero*/
  ngAfterViewInit(){
    this.img.nativeElement.src = this.songService.getImg(this.genre);
  }

}
