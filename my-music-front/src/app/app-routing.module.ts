import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PlaylistsGalleryComponent } from './components/playlists-gallery/playlists-gallery.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SongsGalleryComponent } from './components/songs-gallery/songs-gallery.component';
import { PermissionsGuard } from './guards/permissions.guard';
import { SignupComponent } from './components/signup/signup.component';
import { TermsandconditionsComponent} from './components/termsandconditions/termsandconditions.component';

//modulo de navegacion. reglas de navegacion
// determina que componente atiende/responde a una determinada ruta

const routes: Routes = [
  { path:'', redirectTo:'/auth', pathMatch:'full'},
  { path: 'auth',component:LoginComponent },
  { path: 'music', component:PlaylistsComponent, canActivate:[PermissionsGuard],
      children:[
        {path:'playlists', component:PlaylistsGalleryComponent},
        {path:'songs', component:SongsGalleryComponent}
      ]
  },
  { path: 'signup', component: SignupComponent},
  { path: 'termsandconditions', component: TermsandconditionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
