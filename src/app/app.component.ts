import { Component, OnInit } from '@angular/core';
import { ArtisansService } from './artisans.service';
import { Artisan } from './artisan.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent implements OnInit {
  title = 'Mon Application';
  artisans: Artisan[] = [];
  filteredArtisans: Artisan[] = [];

  constructor(private artisansService: ArtisansService) { }

  ngOnInit() {
    // Récupérer les artisans au chargement du composant
    this.artisans = this.artisansService.getArtisans();
    this.filteredArtisans = this.artisans; // Affiche tous les artisans par défaut
  }

  handleSearch(term: string) {
    this.filteredArtisans = this.artisans.filter(artisan => 
      artisan.name.toLowerCase().includes(term.toLowerCase()) || 
      artisan.specialty.toLowerCase().includes(term.toLowerCase())
    );
  }
}