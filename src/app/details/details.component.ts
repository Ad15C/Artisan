import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisan.model';
import { ActivatedRoute } from '@angular/router';
import { ArtisansService } from '../artisans.service';
import emailjs from '@emailjs/browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  details?: Artisan;
  artisan?: Artisan;
  activeAccordion: number | null = 1; /* accordéon actif */

  toggleAccordion(index: number) {
    this.activeAccordion = this.activeAccordion === index ? null : index;
  }

  sendEmail(form: NgForm) {
    console.log("Form Submitted");
    console.log("Form Valid:", form.valid);
    console.log("Form Values:", form.value);  // Vérifiez les valeurs ici

    if (form.invalid) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    const templateParams = {
        name: form.value.name,
        firstName: form.value.firstName,
        object: form.value.object,
        message: form.value.message,
        artisanEmail: 'ad15canon@gmail.com'
    };

    const publicKey = import.meta.env['VITE_EMAILJS_PUBLIC_KEY'];
    const serviceID = import.meta.env['VITE_EMAIL_SERVICE_ID'];
    const templateID = import.meta.env['VITE_EMAILJS_TEMPLATE_ID'];

    console.log("Template Params:", templateParams);  // Vérifiez les valeurs ici

    // Envoyez l'email
    emailjs.send(serviceID, templateID, templateParams)
        .then((res: any) => {
            alert('Votre message a bien été envoyé !');
            (document.querySelector('#myForm') as HTMLFormElement)?.reset();
        })
        .catch((error: any) => {
            console.error("Erreur lors de l'envoi du formulaire :", error);
            alert("Une erreur est survenue lors de l'envoi de votre formulaire. Veuillez réessayer.");
        });
}


  constructor (
    private route: ActivatedRoute,
    private artisanService: ArtisansService
  ) {}

  ngOnInit(): void  {
    console.log(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    console.log(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    console.log(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);

    const name = this.route.snapshot.paramMap.get('name')?.toLowerCase();
    this.details = this.artisanService.getArtisanByName(name);

    if (this.details) {
      this.artisan = this.details;
    }
  }

  
}
