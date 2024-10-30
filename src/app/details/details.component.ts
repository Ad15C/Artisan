import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisan.model';
import { ActivatedRoute } from '@angular/router';
import { ArtisansService } from '../artisans.service';
import emailjs from 'emailjs-com';
import { environment } from 'environnements/environnement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  details?: Artisan;
  artisan?: Artisan;
  activeAccordion: number | null = 1; /* accordéon actif */
  contactForm: FormGroup;
  confirmationMessage: string | null = null;

  constructor (
    private route: ActivatedRoute,
    private artisanService: ArtisansService,
    private fb: FormBuilder /* Ajout du FormBuilder*/
  ) {
    /* Initialisation du formulaire */
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      object: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void  {
    const name = this.route.snapshot.paramMap.get('name')?.toLowerCase();
    this.details = this.artisanService.getArtisanByName(name);

    if (this.details) {
      this.artisan = this.details;
    }
  }

  toggleAccordion(index: number) {
    this.activeAccordion = this.activeAccordion === index ? null : index;
  }

  sendEmail() {
    const { name, firstName, object, message } = this.contactForm.value;

    console.log('Public Key:', environment.emailjsPublicKey); 
    
    emailjs.send(
      environment.emailjsServiceId,
      environment.emailjsTemplateId,
      {
        name,
        firstName,
        object,
        message,
      },
      environment.emailjsPublicKey
    )
    .then(
      (response) => {
        console.log('Votre message a bien été envoyé', response);
        this.confirmationMessage = 'Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.'; /* message de confirmation*/
        this.contactForm.reset(); /* Réinitialisation du formulaire */
      },
      (error) => {
        console.error('Un problème est survenu lors de l\'envoi de votre message', error);
        this.confirmationMessage = 'Un problème est survenu, veuillez réessayer.'; /* Message d'erreur */
      }
    );
  }
}
