import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisan.model';
import { ArtisansService } from '../artisans.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-alimentation',
  templateUrl: './alimentation.component.html',
  styleUrls: ['./alimentation.component.scss']
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