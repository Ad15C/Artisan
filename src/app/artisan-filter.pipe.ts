import { Pipe, PipeTransform } from '@angular/core';
import { Artisan } from './artisan.model'; 

@Pipe({
  name: 'artisanFilter'
})
export class ArtisanFilterPipe implements PipeTransform {
  transform(
    artisans: Artisan[], 
    localisation: string = '', 
    specialite: string = '', 
    note?: number, 
    category: string = ''
  ): Artisan[] {
    if (!artisans) return [];
    if (!localisation && !specialite && !category && note === undefined) return artisans;

    return artisans.filter(artisan => {
      const matchesLocation = localisation ? artisan.location.toLowerCase().includes(localisation.toLowerCase()) : true;
      const matchesSpecialty = specialite ? artisan.specialty.toLowerCase().includes(specialite.toLowerCase()) : true;
      const matchesCategory = category ? artisan.category.toLowerCase().includes(category.toLowerCase()) : true;

      return matchesLocation && matchesSpecialty && matchesCategory;
    });
  }
}