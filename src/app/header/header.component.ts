import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] 
})

export class HeaderComponent {
  isNavbarOpen = false;
  isMobileOrTablet = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    //vérification de la taille ecran
    this.checkScreenSize();
  }

  //Changement etat du menu
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  //decorateur  pour ecouter evenement
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    //verifie taille ecran lors du redimensionnement
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      //sauegarde etat precedent
      const wasMobile = this.isMobileOrTablet;
      //definit si c'est un mobile ou une tablette
      this.isMobileOrTablet = window.innerWidth <= 768; 

      //ferme le menu si on est en mode mobile
      if (this.isMobileOrTablet && !wasMobile) {
        this.isNavbarOpen = false;
      }
    }
  }
}
