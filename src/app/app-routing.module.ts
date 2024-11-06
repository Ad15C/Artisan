import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BatimentComponent } from './batiment/batiment.component';
import { ServicesComponent } from './services/services.component';
import { AlimentationComponent } from './alimentation/alimentation.component';
import { FabricationComponent } from './fabrication/fabrication.component';
import { DetailsComponent } from './details/details.component';



const routes: Routes = [
  {path:'', component: HomeComponent}, 
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'batiment', component: BatimentComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'alimentation', component: AlimentationComponent },
  { path: 'fabrication', component: FabricationComponent },
  { path: 'artisan/:name', component: DetailsComponent },
  {path:'pagenotfound', component: PagenotfoundComponent }, /* Page 404 non trouvée*/
  {path:'**', component: PagenotfoundComponent } /*Route non trouvée */
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
