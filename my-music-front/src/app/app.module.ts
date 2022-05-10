// import libreria pagination
import {NgxPaginationModule} from 'ngx-pagination';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';

// imports de angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { PlaylistsGalleryComponent } from './components/playlists-gallery/playlists-gallery.component';
import { SongsGalleryComponent } from './components/songs-gallery/songs-gallery.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
//import de mdboostrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CardComponent } from './components/card/card.component';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';
import { CardPlaylistComponent } from './components/card-playlist/card-playlist.component';
import { PlaylistsService } from './services/playlists.service';
import { CardAddComponent } from './components/card-add/card-add.component';
import { InfoPlaylistComponent } from './components/info-playlist/info-playlist.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CardAddSongComponent } from './components/card-add-song/card-add-song.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaylistsComponent,
    FooterComponent,
    HeaderComponent,
    AsideMenuComponent,
    PlaylistsGalleryComponent,
    SongsGalleryComponent,
    SignupComponent,
    CardComponent,
    TermsandconditionsComponent,
    CardPlaylistComponent,
    CardAddComponent,
    InfoPlaylistComponent,
    ErrorPageComponent,
    CardAddSongComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MdbModalModule,
    NgxPaginationModule
  ],
  providers: [AuthenticationService,PlaylistsService,
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
