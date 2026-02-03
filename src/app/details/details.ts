import { Component, inject, input } from '@angular/core';
import { PokeService } from '../core/services/poke.service';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'poke-details',
  imports: [TitleCasePipe, NgOptimizedImage, RouterLink],
  template: `
    @if (pokeResource.isLoading()) {
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
      } @else if (pokeResource.error()) {
        <p>Error al cargar el Pokémon</p>
      } @else {
        @if (pokeResource.value(); as pokemon) {
          <h1 class="detail-title">Pokémon #{{ pokemon.id }}</h1>
          <div class="poke-details">
            <img 
              width="200"
              height="200"
              [ngSrc]="pokemon.sprites.front_default" 
              [alt]="pokemon.name"
            />
            <h1 class="detail-title"> {{ pokemon.name | titlecase  }} </h1>

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
            Return to Podédex
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
