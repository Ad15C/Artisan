import { Component, HostListener, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] 
})
export class HeaderComponent {
  isNavbarOpen: boolean = false;
  isMobile: boolean = false;
  searchTerm: string = ''; /* Le terme de recherche */
  searchType: string = 'name'; /* La valeur par défaut de recherche */
  results: any [] = []; /* Les résultats de la recherche */

  @Output() searchChanged = new EventEmitter<{ term: string, type: string }>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router,
    private route: ActivatedRoute  /* Ajout de ActivatedRoute */
  ) {
    this.checkScreenSize();
  }

  /* Barre de recherche : OnClick du bouton de recherche */
  onSearch(): void {
    if (!this.searchTerm) {
      /* Ne rien faire si le champs est vide */
      return; 
    }
    
    /* Rediriger avec le terme de recherche et le type de recherche */
    this.router.navigate(['/search-results'], {
      queryParams: { term: this.searchTerm, type: this.searchType }
    });
    /* Vide le champ après la recherche */
    this.searchTerm = '';
  }

  ngOnInit(): void {
    /* Lors du chargement de la page, on récupère les paramètres de l'URL */
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'];
      this.searchType = params['type'] || 'name';
      this.performSearch();
    });
  }

  performSearch(): void {
    /* Selon le type de recherche, on effectue la recherche par nom, spécialité ou localisation */
    if (this.searchType === 'location') {
      this.searchByLocation(this.searchTerm);
    } else if (this.searchType === 'name') {
      this.searchByName(this.searchTerm);
    } else if (this.searchType === 'specialty') {
      this.searchBySpecialty(this.searchTerm);
    }
  }

  searchByLocation(term: string): void {
    /* Implémenter la recherche par ville */
    this.results = [];
  }

  searchByName(term: string): void {
    /* Implémenter la recherche par nom */
    this.results = []; 
  }

  searchBySpecialty(term: string): void {
    /* Implémenter la recherche par profession */
    this.results = []; 
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
}

