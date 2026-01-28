import { Component, inject } from '@angular/core';
import { PokeService } from '../core/services/poke.service';
import { Card } from './card/card';

@Component({
  selector: 'poke-list',
  imports: [Card],
  template: `
    <h1 class="title">My pokédex</h1>
    <div class="poke-container">
      @if (pokeListResource.isLoading()) {
        <p>Loading...</p>
      } @else if (pokeListResource.error()) {
        <p>Error al cargar el Pokémon :(</p>
      } @else {
        @let pokeList = pokeListResource.value();

        @for (pokeResult of pokeList?.results; track pokeResult) {
          <poke-card [pokeResult]="pokeResult" />
        }
      }
    </div>
  `,
  styleUrl: './list.css',
})
export class List {
  readonly #pokeService = inject(PokeService);

  protected readonly pokeListResource = this.#pokeService.getPokeList();
}
