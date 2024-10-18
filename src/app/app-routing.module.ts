import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisansComponent } from './artisans/artisans.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'', component: HomeComponent}, //Page d'accueil
  {path: 'artisans', component: ArtisansComponent},
  {path:'**', component: PagenotfoundComponent} //Route non trouvée
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
