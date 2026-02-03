import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./assets/footer/footer";

@Component({
  selector: 'poke-root',
  imports: [RouterOutlet, Footer],
  template: `
    <main class="container">
      <router-outlet />
    </main>
    <poke-footer />
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokedex');
}
