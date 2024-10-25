import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisan.model';
import { ArtisansService } from '../artisans.service';

@Component({
  selector: 'app-batiment',
  templateUrl: './batiment.component.html',
  styleUrls: ['./batiment.component.scss']
})
export class BatimentComponent implements OnInit  {
 artisans: Artisan[] = [];
 category: string = 'Bâtiment';

 constructor(private artisansService: ArtisansService) {}

 ngOnInit(): void {
   this.artisans = this.artisansService.getArtisans().filter(artisan => 
     artisan.category === this.category
   );
 }
 formatArtisanName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}
}
