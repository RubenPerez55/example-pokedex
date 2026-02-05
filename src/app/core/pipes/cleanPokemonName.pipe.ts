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
    'chi-yu', 
    'iron-moth', 
    'iron-jugulis', 
    'iron-thorns', 
    'iron-bundle',
    'iron-valiant',
    'iron-hands',
    'iron-treads',
    'iron-leaves',
    'iron-boulder',
    'iron-crown',
    'great-tusk',
    'scream-tail',
    'brute-bonnet',
    'flutter-mane',
    'slither-wing',
    'sandy-shocks',
    'roaring-moon',
    'iron-volt',
    'walking-wake',
    'gouging-fire',
    'raging-bolt'
  ];

  toTransform = [
    'Deoxys-normal',
    'Wormadam-plant',
    'Giratina-altered',
    'Shaymin-land',
    'Basculin-red-striped',
    'Darmanitan-standard',
    'Tornadus-incarnate',
    'Thundurus-incarnate',
    'Landorus-incarnate',
    'Kyurem-normal',
    'Meloetta-aria',
    'keldeo-ordinary',
    'aegislash-shield',
    'pumpkaboo-average',
    'gourgeist-average',
    'oricorio-baile',
    'lycanroc-midday',
    'wishiwashi-solo',
    'minior-red-meteor',
    'mimikyu-disguised',
    'toxtricity-amped',
    'indeedee-male',
    'morpeko-full-belly',
    'urshifu-single-strike',
    'basculegion-male',
    'enamorus-incarnate',
    'oinkologne-male',
    'maushold-family-of-four',
    'squawkabilly-green-plumage',
    'dudunsparce-two-segment',
  ];


  transform(value: string | null | undefined): string {
    if (!value) return '';

    if ( value.endsWith('mega') || value.endsWith('x') || value.endsWith('y') ) {
      return value;
    }

    if ( value.endsWith('gmax') ) {
      return value;
    }

    if (this.exceptions.includes(value.toLowerCase())) {
      return value;
    }
    // return value.split('-')[0];
    return value;
  }
}
