import { Component , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() note: number = 0; /* Note actuelle */
  @Input() maxNote: number = 5; /* Nombre maximal d'étoiles */
  @Output() noteChange = new EventEmitter<number>(); /* Émet la nouvelle note */

    fullStars: number = 0;
    halfStar: number = -1;

    ngOnChanges() {
      this.setStars(this.note);
    }

    setStars(rating: number) {
      this.fullStars = Math.floor(rating); /* Nombre d'étoiles pleines */
      this.halfStar = this.note % 1 >= 0.5 ? this.fullStars : -1; /* Détermine si une demi-étoile doit être affichée */
    }
  
    rate(star: number) {
      this.note = star;
      this.setStars(this.note);
      this.noteChange.emit(this.note);
    }
  
    get stars() {
      return new Array(this.maxNote);
    }

  }

