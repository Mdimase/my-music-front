import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PlaylistsGalleryComponent } from './components/playlists-gallery/playlists-gallery.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SongsGalleryComponent } from './components/songs-gallery/songs-gallery.component';

//modulo de navegacion. reglas de navegacion
// determina que componente atiende/responde a una determinada ruta

const routes: Routes = [
  { path:'', redirectTo:'/auth', pathMatch:'full'},
  { path: 'auth',component:LoginComponent },
  { path: 'music', redirectTo:'music/playlists', pathMatch:'full' },
  { path: 'music', component:PlaylistsComponent, 
      children:[
        {path:'playlists', component:PlaylistsGalleryComponent},
        {path:'songs', component:SongsGalleryComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
