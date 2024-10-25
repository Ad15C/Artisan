import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisan.model';
import { ArtisansService } from '../artisans.service';

@Component({
  selector: 'app-fabrication',
  templateUrl: './fabrication.component.html',
  styleUrl: './fabrication.component.scss'
})
export class FabricationComponent {
  artisans: Artisan[] = [];
  category: string = 'Fabrication';
 
  constructor(private artisansService: ArtisansService) {}
 
  ngOnInit(): void {
    this.artisans = this.artisansService.getArtisans().filter(artisan => 
      artisan.category === this.category
    );
  }
}
