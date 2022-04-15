import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';

//modulo de navegacion. reglas de navegacion
// determina que componente atiende/responde a una determinada ruta

const routes: Routes = [
  { path:'', redirectTo:'/auth', pathMatch:'full'},
  { path: 'auth',component:LoginComponent },
  { path: 'playlists', component:PlaylistsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
