import { Component, inject, input } from '@angular/core';
import { PokeService } from '../core/services/poke.service';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { cleanPokemonNamePipe } from '../core/pipes/cleanPokemonName.pipe';
import { Router, RouterLink } from "@angular/router";
import { PokemonNotFound } from "./pokemon-not-found/pokemon-not-found/pokemon-not-found";

@Component({
  selector: 'poke-details',
  imports: [TitleCasePipe, NgOptimizedImage, RouterLink, PokemonNotFound, cleanPokemonNamePipe],
  template: `
    @if (pokeResource.isLoading()) {
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
      } @else if (pokeResource.error()) {
        <poke-pokemon-not-found />
      } @else {
        @if (pokeResource.value(); as pokemon) {
          <h1 class="detail-title">Pokémon #{{ pokemon.id }}</h1>
          <div class="poke-details">
            <img 
              width="200"
              height="200"
              [ngSrc]="pokemon.sprites.front_default" 
              [alt]="pokemon.name"
              priority
            />
            <h1 class="detail-title"> {{ pokemon.name | titlecase | cleanPokemonNamePipe }} </h1>

            <div>
              @for (type of pokemon.types; track type) {
                <span class="type-badge">
                  {{ type.type.name | titlecase }}
                </span>
              }
            </div>
          </div>

          <div class="nav-buttons">
            @if (pokemon.id !== 1 ) {
              <button 
                (click)="goPrev(pokemon.id)" 
                [disabled]="pokemon.id === 1"> 
                  <i class="bi bi-arrow-left"></i>
                  Previous
              </button>
            }
            @if (pokemon.id !== 1025) {
              <button 
                (click)="goNext(pokemon.id)">
                  Next 
                  <i class="bi bi-arrow-right"></i>
              </button>
            }
          </div>
          <button class="back-link" routerLink="/">
            <i class="bi bi-house-fill"></i>
            <p>Return to Podédex</p>
          </button>
        }
      }
  `,
  styleUrl: './details.css',
})
export default class Details {
  readonly id = input<string>('');

  readonly #pokeService = inject(PokeService);
  private router = inject(Router);

  protected readonly pokeResource = this.#pokeService.getPokemon(this.id);

  goNext(id: number){
    this.router.navigate(['/pokemon', id + 1]);
  }

  goPrev(id: number){
    if ( id > 1 ) {
      this.router.navigate(['/pokemon', id - 1]);
    }
  }

}
