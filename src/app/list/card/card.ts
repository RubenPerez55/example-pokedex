import { Component, inject, input, signal } from '@angular/core';
import { PokeResult } from '../../core/models/poke-result.model';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { PokeImgPipe } from './poke-img-pipe';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../core/models/pokemon.model';
import { PokeService } from '../../core/services/poke.service';

@Component({
  selector: 'poke-card',
  imports: [TitleCasePipe, PokeImgPipe, NgOptimizedImage, RouterLink],
  template: `
    <a class="poke-card" [routerLink]="['/pokemon', getIdFromUrl(pokeResult().url)]">
      <img
        width="120"
        height="120"
        [ngSrc]="pokeResult().url | pokeImg" 
        [alt]="['/pokemon', getIdFromUrl(pokeResult().url)]"
      />
      <p> {{ pokeResult().name | titlecase }} </p>
    </a>
  `,
  styleUrl: './card.css',
})
export class Card {
    readonly pokeResult = input.required<PokeResult>();
  


  getIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  } 


}
