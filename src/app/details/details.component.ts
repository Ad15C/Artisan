import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisan.model';
import { ActivatedRoute } from '@angular/router';
import { ArtisansService } from '../artisans.service';

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

  constructor (
    private route: ActivatedRoute,
    private artisanService: ArtisansService
  ) {}

  ngOnInit(): void  {
    const name = this.route.snapshot.paramMap.get('name')?.toLowerCase();
    this.details = this.artisanService.getArtisanByName(name);

    if (this.details) {
      this.artisan = this.details;
    }
  }
  
}
