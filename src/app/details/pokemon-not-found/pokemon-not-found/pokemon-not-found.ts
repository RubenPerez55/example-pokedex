import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'poke-pokemon-not-found',
  imports: [],
  template: `<p>pokemon-not-found works!</p>`,
  styleUrl: './pokemon-not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonNotFound { }
