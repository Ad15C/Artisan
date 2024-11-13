import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ArtisanFilterPipe } from './artisan-filter.pipe';
import { ArtisansService } from './artisans.service';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BatimentComponent} from './batiment/batiment.component';
import { ServicesComponent } from './services/services.component';
import { FabricationComponent } from './fabrication/fabrication.component';
import { AlimentationComponent } from './alimentation/alimentation.component';
import { DetailsComponent } from './details/details.component';
import { RatingComponent } from './rating/rating.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PagenotfoundComponent,
    ArtisanFilterPipe,
    SearchResultsComponent,
    BatimentComponent,
    ServicesComponent,
    FabricationComponent,
    AlimentationComponent,
    DetailsComponent,
    RatingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]) 
  ],
  providers: [ArtisansService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
