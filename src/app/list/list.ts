import { Component, computed, effect, inject, signal } from '@angular/core';
import { PokeService } from '../core/services/poke.service';
import { Card } from './card/card';
import { GenerationFilter } from "./filter/generation-filter/generation-filter";

@Component({
  selector: 'poke-list',
  imports: [Card, GenerationFilter],
  template: `
  <div class="main-title">
    <h1 class="title">The Ultimate Pokédex</h1>
    <input 
      class="search-bar"
      type="text"
      placeholder="Search Pokémon by name..."
      (input)="search.set($event.target.value.toLowerCase())"
    />
  </div>
  
  <!-- Filter -->
  <poke-generation-filter />

  @if (pokeListResource.isLoading()) {
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  } @else if (pokeListResource.error()) {
    <p>Error: Pokémon not Found</p>
  } @else {
    @if (search() && filteredResults().length === 0) {
      <p>Couldn't find any result</p>
    } @else {
      <div class="poke-container">
        @for (pokeResult of filteredResults(); track pokeResult.name) {
          <!-- Card of each Pokémon -->
          <poke-card [pokeResult]="pokeResult" />
        }
      </div>
    }

    <div class="nav-buttons">
      @if (offset() !== 0 ) {
        <button (click)="prevPage()" [disabled]="offset() === 0">
          <i class="bi bi-arrow-left"></i>
          Previous
        </button>
      }
      <button (click)="nextPage()">
        Next 
        <i class="bi bi-arrow-right"></i>
      </button>
    </div>
  }
  `,
  styleUrl: './list.css',
})
export class List {
  readonly #pokeService = inject(PokeService);
  search = signal('');
  allPokemonResource = this.#pokeService.loadAllPokemon();
  limit = signal(20);
  offset = signal(0);

  cacheEffect = effect(() => {
    const data = this.allPokemonResource.value();
    if (data?.results?.length) {
      this.#pokeService.allPokemon.set(data.results);
      console.log('CACHE LOADED:', data.results.length);
    }
  });


  paginatedResults = computed(() => {
    const data = this.pokeListResource.value();
    return data?.results ?? [];
  });

  // resultados al usar el filtro de búsqueda
  filteredResults = computed(() => {
    const query = this.search();
    const globalList = this.#pokeService.allPokemon();
    const pageList = this.paginatedResults();

    if (!query) return pageList;

    return globalList.filter(p =>
      p.name.includes(query)
    );
  });

  pokeListResource = this.#pokeService.getPokeList(
    this.limit, 
    this.offset
  );

  nextPage() {
    this.offset.set(this.offset() + this.limit());
  }

  prevPage() {
    if ( this.offset() > 0 ) {
      this.offset.set(this.offset() - this.limit());
    }
  }
}
