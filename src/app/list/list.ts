import { Component, computed, effect, inject, signal } from '@angular/core';
import { PokeService } from '../core/services/poke.service';
import { Card } from './card/card';
import { Pagination } from "./filter/pagination/pagination/pagination";
import { Megas } from "./mega/megas/megas";

@Component({
  selector: 'poke-list',
  imports: [Card, Pagination, Megas],
  template: `
  <div class="main-title">
    <h1 class="title">The Ultimate Pokédex</h1>
    <div class="nav-bar">
      <button (click)="toggleMegas.set(!toggleMegas())"> 
        <span> {{ toggleMegas() ? 'Show Pokémon' : 'Show Megas' }} </span>
      </button>
      <button class="toggle-button" (click)="toggleLimit()">
        Toggle limit
      </button>
    </div>
    <p>{{ limit() === 20 ? 'Showing 20 Pokémon' : 'Showing all Pokémon' }}</p>

    <!-- Search Bar -->
    <input 
      class="search-bar"
      type="text"
      placeholder="Search Pokémon by name..."
      (input)="search.set($event.target.value.toLowerCase())"
    />
  </div>

  @if (pokeListResource.isLoading()) {
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  } @else if ( pokeListResource.error() || search() && filteredResults().length === 0) {
      <div class="error-msg">
        <p>
          Couldn't find any result...
        </p>
        <p>
          <span>Try with another Pokémon name</span>
        </p>
      </div>
    } @else {
      @if (toggleMegas()) {
        <poke-megas></poke-megas>
      } @else {
        <div class="poke-container">
          @for (pokeResult of filteredResults(); track pokeResult.name) {
            <!-- Card of each Pokémon -->
            <poke-card [pokeResult]="pokeResult" />
          }
        </div>
      }
    }
    @if ( limit() === 20 ) {<poke-pagination /> } 

    @if ( limit() !== 20 ) {
      <button class="go-up-button" (click)="goTop()">
        Return to Top
        <i class="bi bi-arrow-up"></i>
      </button>
    }
  `,
  styleUrl: './list.css',
})


export class List {
  // imported Service
  readonly #pokeService = inject(PokeService);

  // Signals
  search = signal('');
  limit = this.#pokeService.limit;
  offset = this.#pokeService.offset;
  toggleMegas = signal(false);

  // Constants for Toggle Limit
  previousOffset = signal(0);
  MAX_POKEMON = 1025;
  PAGE_SIZE = 20;
  MAX_OFFSET = this.MAX_POKEMON - this.PAGE_SIZE;


  // Toggle Button on Main Title
  toggleLimit() {
    const isPaginated = this.limit() === 20; 
    if (isPaginated) {
      this.previousOffset.set(this.offset());
      this.limit.set(1025);
      this.offset.set(0);

    } else {
      this.limit.set(20);

      const restored = this.previousOffset();
      this.offset.set(restored > this.MAX_OFFSET ? this.MAX_OFFSET : restored);
    }
  }

  // Functions / Signals related to Pokémon List
  paginatedResults = computed(() => {
    const data = this.pokeListResource.value();
    return data?.results ?? [];
  });

  filteredResults = computed(() => {
    const query = this.search();
    const globalList = this.#pokeService.allPokemon();
    const pageList = this.paginatedResults();

    if (!query) {
      return pageList;
    } else {
      return globalList.filter(p =>
        p.name.startsWith(query)
    );
    }
  });

  cacheEffect = effect(() => {
    const data = this.#pokeService.allPokemon();
    if (data?.length) {
      this.#pokeService.allPokemon.set(data);
      console.log('CACHE LOADED:', data.length);
    }
  });

  pokeListResource = this.#pokeService.getPokeList(
    this.limit, 
    this.offset
  );

  // Go Up Button
  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
