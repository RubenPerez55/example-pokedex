import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'poke-footer',
  imports: [],
  template: `
    <div class="footer">
      <p>
        <i class="bi bi-c-circle"></i> 2026 Pokémon. <i class="bi bi-c-circle"></i>1995-2026
      </p>
      <p>
        Nintendo/Creatures Inc./GAME FREAK inc. TM,
      </p>
      <p>
        <i class="bi bi-c-circle"></i>Nintendo.
      </p>
    </div>
  `,
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer { }
