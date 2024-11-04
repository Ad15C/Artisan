import { Component, HostListener, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] 
})
export class HeaderComponent {
  isNavbarOpen: boolean = false;
  isMobile: boolean = false;
  searchTerm: string = '';

  @Output() searchChanged = new EventEmitter<string>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.checkScreenSize();
  }

  /* Changement état du menu */
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
}

  /* Décorateur pour écouter l'événement de redimensionnement */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  /* Vérification de la taille d'écran */
  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      const wasMobile = this.isMobile;
      this.isMobile = width <= 768; 

      /* Debugging pour vérifier taille de l'écran*/
      console.log('Width:', width, 'Is Mobile:', this.isMobile); 

      /* Ferme le menu si on est en mode mobile */
      if (this.isMobile && !wasMobile) {
        this.isNavbarOpen = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideMenu = target.closest('.navbar') || target.closest('.navbar-toggler');
    
    if (!clickedInsideMenu && this.isNavbarOpen) {
      /* Ferme le menu si le clic est en dehors */
      this.isNavbarOpen = false; 
    }
  }

  /*Barre de recherche */
  onSearch(): void {
    this.searchChanged.emit(this.searchTerm);
    this.router.navigate(['/search-results'], { queryParams: { term: this.searchTerm } }); // Redirige avec le terme
    /* Vide le champ après la recherche */
    this.searchTerm = '';
  }
}
