import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisan.model';
import { ArtisansService } from '../artisans.service';

@Component({
  selector: 'app-alimentation',
  templateUrl: './alimentation.component.html',
  styleUrl: './alimentation.component.scss'
})
export class AlimentationComponent implements OnInit  {
  artisans: Artisan[] = [];
  category: string = 'Alimentation';
 
  constructor(private artisansService: ArtisansService) {}
 
  ngOnInit(): void {
    this.artisans = this.artisansService.getArtisans().filter(artisan => 
      artisan.category === this.category
    );
  }
 }