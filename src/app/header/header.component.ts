import { Component, HostListener, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] 
})
export class HeaderComponent {
  isNavbarOpen = false;
  isMobileOrTablet = false;
  searchTerm: string = '';

  @Output() searchChanged = new EventEmitter<string>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, 
  private router: Router) {
    this.checkScreenSize();
  }

  // Changement état du menu
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  // Décorateur pour écouter l'événement de redimensionnement
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  // Vérification de la taille d'écran
  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      const wasMobile = this.isMobileOrTablet;
      this.isMobileOrTablet = width <= 768; 

      // Ferme le menu si on est en mode mobile
      if (this.isMobileOrTablet && !wasMobile) {
        this.isNavbarOpen = false;
      }
    }
  }

  onSearch(): void {
    this.searchChanged.emit(this.searchTerm);
    this.router.navigate(['/search-results'], { queryParams: { term: this.searchTerm } }); // Redirige avec le terme
    this.searchTerm = ''; // Vide le champ après la recherche
  }
}
