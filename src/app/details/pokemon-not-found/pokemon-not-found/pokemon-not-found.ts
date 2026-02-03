import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'poke-pokemon-not-found',
  imports: [RouterLink],
  template: `
    <div class="notFound-container">
      <h1 class="notFound-title">Something went wrong</h1>
      <img src="assets/404-Pokemon.png" alt="404 error">
      <button class="notFound-button" routerLink="/">
        <i class="bi bi-house-fill"></i>
        Return to Podédex
      </button>
    </div>
  `,
  styleUrl: './pokemon-not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonNotFound {

 }
