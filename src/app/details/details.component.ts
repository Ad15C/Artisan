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

  constructor (
    private route: ActivatedRoute,
    private artisanService: ArtisansService
  ) {}

  ngOnInit(): void  {
    const name = this.route.snapshot.paramMap.get('name')?.toLowerCase();
    this.details = this.artisanService.getArtisanByName(name);
  }
  
}
