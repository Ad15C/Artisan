import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisan.model';
import { ArtisansService } from '../artisans.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  artisans: Artisan[] = [];
  topArtisans: Artisan[] = [];

  constructor(private artisansService: ArtisansService) {}

  ngOnInit() {
    this.artisans = this.artisansService.getArtisans(); // Récupérer les artisans avec les images
    this.topArtisans = this.artisansService.getTop3Artisans(); // Récupérer les 3 meilleurs artisans
    console.log(this.topArtisans);
  }
  formatArtisanName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }
}