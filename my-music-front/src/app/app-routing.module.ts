import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PlaylistsGalleryComponent } from './components/playlists-gallery/playlists-gallery.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SongsGalleryComponent } from './components/songs-gallery/songs-gallery.component';
import { PermissionsGuard } from './guards/permissions.guard';
import { SignupComponent } from './components/signup/signup.component';
import { InfoPlaylistComponent } from './components/info-playlist/info-playlist.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

// modulo de navegacion
// determina que componente atiende/responde a una determinada ruta

const routes: Routes = [
  { path:'', redirectTo:'/auth', pathMatch:'full'},
  { path: 'auth',component:LoginComponent },
  { path: 'music', component:PlaylistsComponent, canActivate:[PermissionsGuard],
      children:[
        {path:'playlists', component:PlaylistsGalleryComponent},
        {path:'playlists/:id',component:InfoPlaylistComponent},
        {path:'songs', component:SongsGalleryComponent}
      ]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'error',component: ErrorPageComponent },
  { path: '**', redirectTo:'/auth',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
