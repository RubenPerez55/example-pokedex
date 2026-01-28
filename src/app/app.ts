import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'poke-root',
  imports: [RouterOutlet],
  template: `
    <main class="container">
      <router-outlet />
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokedex');
}
