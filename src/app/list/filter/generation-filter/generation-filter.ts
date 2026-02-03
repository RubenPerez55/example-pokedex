import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'poke-generation-filter',
  imports: [],
  template: `
  <div class="gen-filter">
    <select>
      <option value="">All</option>
      <option value="1">Kanto</option>
      <option value="2">Johto</option>
      <option value="3">Hoeen</option>
      <option value="4">Sinnoh</option>
      <option value="5">Teselia</option>
      <option value="6">Kalos</option>
      <option value="7">Alola</option>
      <option value="8">Galar</option>
      <option value="9">Paldea</option>
    </select>
  </div>
  `,
  styleUrls: ['./generation-filter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerationFilter {









  

}