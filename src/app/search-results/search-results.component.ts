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

  constructor(private artisansService: ArtisansService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.artisans = this.artisansService.getArtisans();

    function normalizeTerm(term: string): string {
      return term
          .toLowerCase()
          /* Ajoute d'autres remplacements si nécessaire */
          .replace('bâtiment', 'batiment')
          .replace('é', 'e')
          .replace('è', 'e')
          .replace('à', 'a')
          .replace('ç', 'c')
          .replace('ù', 'u');
  }
  

      this.route.queryParams.subscribe(params => {
          const searchTerm = params['term'] ? normalizeTerm(params['term']) : '';
      
          this.filteredArtisans = this.artisans.filter(artisan => {
              const nameMatches = normalizeTerm(artisan.name).includes(searchTerm);
              const locationMatches = normalizeTerm(artisan.location).includes(searchTerm);
              const categoryMatches = normalizeTerm(artisan.category).includes(searchTerm);
              const specialtyMatches = normalizeTerm(artisan.specialty).includes(searchTerm);
      
              return nameMatches || locationMatches || categoryMatches || specialtyMatches;
       });
    });
  }
}  
