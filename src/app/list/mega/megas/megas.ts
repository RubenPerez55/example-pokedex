import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { PokeService } from '../../../core/services/poke.service';
import { Card } from "../../card/card";
import { PokeResult } from '../../../core/models/poke-result.model';

@Component({
  selector: 'poke-megas',
  imports: [Card],
  template: `
    <div class="poke-container">
      @for (poke of megaPokemon(); track poke.name) {
        <poke-card [pokeResult]="poke" />
      }
    </div>
  `,
  styleUrl: './megas.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Megas {
  readonly #pokeService = inject(PokeService);
  allRawResource = this.#pokeService.getAllPokemonRaw(2000);
  limit = this.#pokeService.limit;
  offset = this.#pokeService.offset;

  megaList = signal<any[]>([]);

  ngOnInit() {
    this.#pokeService.getAllPokemonRaw(2000).subscribe(data => {
      const megas = data.results.filter((p: any) =>
        p.name.includes('-mega')
      );

      this.megaList.set(megas);
    });
  }

  megaPokemon = computed(() => this.megaList());


  loadMegas = effect(() => {
    const baseList = this.#pokeService.allPokemon();
    const max = this.limit();

    if (!baseList.length) return;

    this.megaList.set([]);

    baseList.slice(0, max).forEach(p => { 
      const id = this.extractId(p.url);

      this.#pokeService.getSpeciesRaw(id).subscribe((species: any) => {
        const megas = species.varieties
          .filter((v: any) => 
            !v.is_default && v.pokemon.name.includes('mega')
          )
          .map((v: any) => v.pokemon);

        if (megas.length) {
          this.megaList.update(list => [...list, ...megas]);
        }
      });
    });
  });

  extractId(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]);
  }
}
