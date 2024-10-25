import { Component, OnInit } from '@angular/core';
import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';

@Component({
  selector: 'app-artisans',
  templateUrl: './artisans.component.html',
  styleUrls: ['./artisans.component.scss']
})
export class ArtisansComponent implements OnInit {
  artisans: Artisan[] = [];
  filteredArtisans: Artisan[] = []; 
  selectedLocalisation: string = '';
  selectedSpecialite: string = '';
  selectedNote?: number;
  selectedCategory: string = '';

  constructor(private artisansService: ArtisansService) {}

  ngOnInit() {
    this.artisans = this.artisansService.getArtisans();
    this.filteredArtisans = this.artisans; 
  }

  onFilter() {
    /* Filtrer selon la spécialité et la catégorie */
    this.artisans = this.artisansService.getArtisans().filter(artisan => {
      const matchesSpecialty = this.selectedSpecialite ? artisan.specialty.toLowerCase().includes(this.selectedSpecialite.toLowerCase()) : true;
      const matchesCategory = this.selectedCategory ? artisan.category.toLowerCase().includes(this.selectedCategory.toLowerCase()) : true;

      return matchesSpecialty && matchesCategory;

    });
  }

  resetFilters() {
    this.selectedSpecialite = '';
    this.selectedCategory = '';
    
    // Remettre la liste des artisans à la liste complète
    this.artisans = this.artisansService.getArtisans();
  }
}