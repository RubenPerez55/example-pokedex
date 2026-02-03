import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { PokeList } from '../models/poke-list.model';
import { Pokemon } from '../models/pokemon.model';
import { PokeResult } from '../models/poke-result.model';
import { Generation } from '../models/generation.model';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  readonly #pokeURL = 'https://pokeapi.co/api/v2';
  allPokemon = signal<PokeResult[]>([]);

  async pokemonExists(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${this.#pokeURL}/pokemon/${id}`);
      return res.ok;
    } catch {
      return false;
    }
  }

  getPokeList(limit: Signal<number>, offset: Signal<number>) {
    return httpResource<PokeList>(() => 
      `${this.#pokeURL}/pokemon?limit=${limit()}&offset=${offset()}`
    );
  }

  getPokemon(id: Signal<string>): HttpResourceRef<Pokemon | undefined> {
    return httpResource<Pokemon>(() => 
      `${this.#pokeURL}/pokemon/${id()}`
  );
  }
  
  loadAllPokemon() {
    return httpResource<PokeList>(() => 
      `${this.#pokeURL}/pokemon?limit=1025`
    );
  }

  getGeneration(gen: number) {
    return httpResource<Generation>(() => 
      `${this.#pokeURL}/generation/${gen}`
    );
  }
}
