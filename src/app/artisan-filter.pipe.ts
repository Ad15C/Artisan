import { Pipe, PipeTransform } from '@angular/core';
import { Artisan } from './artisan.model'; 

@Pipe({
  name: 'artisanFilter'
})
export class ArtisanFilterPipe implements PipeTransform {
  transform(
    artisans: Artisan[], 
    name?: string,
    specialty?: string,
    note?: number,
    location?: string ,
    category?: string,
    image?: string,
   
  ): Artisan[] {
    if (!artisans) return [];
    if (!name && !specialty && note === undefined && !location && !category) return artisans;

    return artisans.filter(artisan => {
      const matchesName = name ? artisan.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesSpecialty = specialty ? artisan.specialty.toLowerCase().includes(specialty.toLowerCase()) : true;
      const matchesNote = note !== undefined ? artisan.note === note : true;
      const matchesLocation = location ? artisan.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesCategory = category ? artisan.category.toLowerCase().includes(category.toLowerCase()) : true;

      return matchesName && matchesSpecialty && matchesNote && matchesLocation && matchesCategory;
    });
  }
}