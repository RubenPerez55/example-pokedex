import { Component, inject, input } from '@angular/core';
import { PokeService } from '../core/services/poke.service';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'poke-details',
  imports: [TitleCasePipe, NgOptimizedImage, RouterLink],
  template: `
    @if (pokeResource.isLoading()) {
        <p>Loading...</p>
      } @else if (pokeResource.error()) {
        <p>Error al cargar el Pokémon</p>
      } @else {
        @if (pokeResource.value(); as pokemon) {
          <div class="poke-details">
            <img 
              width="200"
              height="200"
              [ngSrc]="pokemon.sprites.front_default" 
              [alt]="name()"
            />
            <h1 class="title"> {{ name() | titlecase }} </h1>

            <div>
              @for (type of pokemon.types; track type) {
                <span class="type-badge">
                  {{ type.type.name | titlecase }}
                </span>
              }
            </div>

            <a routerLink="/" class="back-link">← Back to Pokémon List</a>
          </div>
        }
      }
  `,
  styleUrl: './details.css',
})
export default class Details {
  readonly name = input<string>('');

  readonly #pokeService = inject(PokeService);
  protected readonly pokeResource = this.#pokeService.getPokemon(this.name);
}
