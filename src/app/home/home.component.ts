import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisan.model';
import { ArtisansService } from '../artisans.service';
import { Observable, of } from 'rxjs';


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
    this.artisans = this.artisansService.getArtisans(); /* Récupérer les artisans avec les images */
    this.topArtisans = this.artisansService.getTop3Artisans(); /* Récupérer les 3 meilleurs artisans */
  }

  formatArtisanName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  /* Méthode pour mettre à jour la note de l'artisan */
  updateNote(artisanId: number, newNote: number): Observable<Artisan> {
    const artisan = this.artisans.find(a => a.id === artisanId);
      
      if (artisan) {
        artisan.note = newNote;  /* Mise à jour de la note */
        return of(artisan);  /* Retourne l'artisan mis à jour dans un Observable */
      } else {
        throw new Error('Artisan non trouvé');
      }
    }
}