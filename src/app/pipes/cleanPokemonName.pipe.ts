import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanPokemonNamePipe',
})
export class cleanPokemonNamePipe implements PipeTransform {
  exceptions = [
    'mr-mime', 
    'mr-rime', 
    'type-null', 
    'jangmo-o', 
    'hakamo-o', 
    'kommo-o', 
    'tapu-koko', 
    'tapu-lele', 
    'tapu-bulu', 
    'tapu-fini', 
    'ho-oh', 
    'porygon-z', 
    'farfetchd', 
    'wo-chien', 
    'chien-pao', 
    'ting-lu', 
    'chi-yu'
  ];


  transform(value: string | null | undefined): string {
    if (!value) return '';
    if (this.exceptions.includes(value.toLowerCase())) {
      return value;
    }
    return value.split('-')[0];
  }

}
