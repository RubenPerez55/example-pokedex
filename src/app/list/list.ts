import { Component, computed, effect, inject, signal } from '@angular/core';
import { PokeService } from '../core/services/poke.service';
import { Card } from './card/card';

@Component({
  selector: 'poke-list',
  imports: [Card],
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
  
  <!-- Filter WIP -->
  <!-- <poke-generation-filter /> -->

  @if (pokeListResource.isLoading()) {
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  } @else if (pokeListResource.error()) {
    <p>Error: Pokémon not Found</p>
  } @else {
    @if (search() && filteredResults().length === 0) {
      <div class="error-msg">
        <p>
          Couldn't find any result...
        </p>
        <p>
          <span>Try with another Pokémon name</span>
        </p>
      </div>
    } @else {
      <div class="poke-container">
        @for (pokeResult of filteredResults(); track pokeResult.name) {
          <!-- Card of each Pokémon -->
          <poke-card [pokeResult]="pokeResult" />
        }
      </div>
    }

    <div class="nav-buttons" id="nav-buttons">
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
    const buttons = document.getElementById("nav-buttons");

    if (!query) {
      buttons?.classList.remove('disabled');
      return pageList;
    } else {
      buttons?.classList.add('disabled');
      return globalList.filter(p =>
        p.name.startsWith(query)
    );
    }
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
