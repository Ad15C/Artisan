import { Component, OnInit } from '@angular/core';
import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit  {
  artisans: Artisan[] = [];
  category: string = 'Services';
 
  constructor(private artisansService: ArtisansService) {}
 
  ngOnInit(): void {
    this.artisans = this.artisansService.getArtisans().filter(artisan => 
      artisan.category === this.category
    );
  }
}