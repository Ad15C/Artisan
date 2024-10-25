import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ArtisansComponent } from './artisans/artisans.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ArtisanFilterPipe } from './artisan-filter.pipe';
import { ArtisansService } from './artisans.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ArtisansComponent,
    PagenotfoundComponent,
    ArtisanFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ArtisansService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
