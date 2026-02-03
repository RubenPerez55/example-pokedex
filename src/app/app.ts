import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./assets/footer/footer";

@Component({
  selector: 'poke-root',
  imports: [RouterOutlet, Footer],
  template: `
  <div class="app-layout">
    <main class="container content">
      <router-outlet />
    </main>
    <poke-footer />
  </div>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokedex');
}
