import { HttpErrorResponse, HttpHeaderResponse, httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { PokeList } from '../models/poke-list.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  readonly #pokeURL = 'https://pokeapi.co/api/v2';

  getPokeList(): HttpResourceRef< PokeList | undefined >{
    return httpResource<PokeList>(() => `${this.#pokeURL}/pokemon?limit=151`);
  }

  getPokemon(name: Signal<string>): HttpResourceRef<Pokemon | undefined> {
    return httpResource<Pokemon>(() => `${this.#pokeURL}/pokemon/${name()}`)
  }
}
