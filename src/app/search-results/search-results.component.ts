import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artisan } from '../artisan.model';
import { ArtisansService } from '../artisans.service'; 

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  artisans: Artisan[] = [];
  filteredArtisans: Artisan[] = [];
  category: string = '';

  constructor(
    private artisansService: ArtisansService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      /* Récupére tous les artisans */
      this.artisans = this.artisansService.getArtisans();
  
      /* Définition de la méthode normalizeTerm */
      const normalizeTerm = (term: string): string => {
        return term.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); /* Normaliser le terme pour la recherche */
      };
  
      /* Définition de la méthode formatArtisanName */
      this.formatArtisanName = (name: string): string => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); /* Formater le nom pour les URL */
      };
  
      /* Récupérer les paramètres de la route et filtrer les artisans en fonction du terme de recherche */
      this.route.queryParams.subscribe(params => {
        const searchTerm = params['term'] ? normalizeTerm(params['term']) : '';
  
        /* Filtre les artisans en fonction du terme de recherche */
        this.filteredArtisans = this.artisans.filter(artisan => {
          const nameMatches = normalizeTerm(artisan.name).includes(searchTerm);
          const locationMatches = normalizeTerm(artisan.location).includes(searchTerm);
          const categoryMatches = normalizeTerm(artisan.category).includes(searchTerm);
          const specialtyMatches = normalizeTerm(artisan.specialty).includes(searchTerm);
  
          return nameMatches || locationMatches || categoryMatches || specialtyMatches;
        });
      });
    }
  
    /* Méthode formatArtisanName déjà définie plus haut */
    formatArtisanName(name: string): string {
      return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); /* Formater le nom pour les URL */
    }
  }