import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAddSongComponent } from './card-add-song.component';

describe('CardAddSongComponent', () => {
  let component: CardAddSongComponent;
  let fixture: ComponentFixture<CardAddSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAddSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAddSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
