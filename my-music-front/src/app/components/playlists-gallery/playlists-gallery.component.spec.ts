import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsGalleryComponent } from './playlists-gallery.component';

describe('PlaylistsGalleryComponent', () => {
  let component: PlaylistsGalleryComponent;
  let fixture: ComponentFixture<PlaylistsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistsGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
