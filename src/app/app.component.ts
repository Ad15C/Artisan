import { Component, OnInit } from '@angular/core';
import { ArtisansService } from './artisans.service';
import { Artisan } from './artisan.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent implements OnInit {
  title = 'Mon Application';
  artisans: Artisan[] = [];
  filteredArtisans: Artisan[] = [];
  searchTerm: string = '';
  searchType: string = '';

  constructor(
    private artisansService: ArtisansService,
    private router: Router // Injection du Router
  ) { } 

  ngOnInit() {
    /* Récupérer les artisans au chargement du composant */
    this.artisans = this.artisansService.getArtisans();
    /* Affiche tous les artisans par défaut */
    this.filteredArtisans = this.artisans;  
  }

  onSearch(): void {
    if (!this.searchTerm) {
      /* Ne rien faire si le champ est vide */
      return; 
    }
    
    /* Émettre l'événement avec le terme et le type de recherche */
    this.onSearchChanged({ term: this.searchTerm, type: this.searchType });
  
    /* Rediriger vers la page des résultats avec le terme et le type de recherche */
    this.router.navigate(['/search-results'], {
      queryParams: { term: this.searchTerm, type: this.searchType }
    });
  
    /* Vider le champ de recherche après avoir effectué la recherche */
    this.searchTerm = '';
  }
  

  onSearchChanged(event: { term: string, type: string }) {
    const { term, type } = event;

    this.filteredArtisans = this.artisans.filter(artisan => {
      const normalizedTerm = term.toLowerCase();
      
      const matchName = artisan.name.toLowerCase().includes(normalizedTerm);
      const matchSpecialty = artisan.specialty.toLowerCase().includes(normalizedTerm);
      const matchLocation = artisan.location.toLowerCase().includes(normalizedTerm);

      switch (type) {
        case 'name':
          return matchName;
        case 'specialty':
          return matchSpecialty;
        case 'location':
          return matchLocation;
        default:
          return matchName || matchSpecialty || matchLocation;
      }
    });
  }
}