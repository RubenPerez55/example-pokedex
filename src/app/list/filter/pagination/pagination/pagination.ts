import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PokeService } from '../../../../core/services/poke.service';

@Component({
  selector: 'poke-pagination',
  imports: [],
  template: `
    <div class="pagination-bar">
      @for (p of visiblePages(); track $index) {
        @if (p === '...') {
          <span class="ellipsis">...</span>
        } @else {
          <button
            (click)="goToPage(p)"
            [class.active]="p === currentPage()"
          >
            {{ p }}
          </button>
        }
      }
    </div>
    <div class="nav-buttons">
      @if (offset() !== 0 ) {
        <button (click)="prevPage()" [disabled]="offset() === 0">
          <i class="bi bi-arrow-left"></i>
          Previous
        </button>
      }
      @if (!isLastPage()) {
        <button (click)="nextPage()" [disabled]="isLastPage()">
          Next 
          <i class="bi bi-arrow-right"></i>
        </button>
      }
    </div>
  `,
  styleUrl: './pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination { 
  // imported Service
  readonly #pokeService = inject(PokeService);
  offset = this.#pokeService.offset;
  limit = this.#pokeService.limit;

  // Constants
  MAX_POKEMON = 1025;
  PAGE_SIZE = 20;
  MAX_OFFSET = this.MAX_POKEMON - this.PAGE_SIZE;

  // Functions / Signals related to Pagination
  totalPages = computed(() => {
    return Math.ceil(
      (this.MAX_OFFSET + this.PAGE_SIZE) / this.PAGE_SIZE
    );
  });

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  currentPage = computed(() => 
    Math.floor(this.offset() / this.PAGE_SIZE) + 1
  );

  isLastPage = computed(() => {
    if (this.limit() !== 20) return true;
    return this.offset() >= this.MAX_OFFSET;
  });

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    // Number of pages to show around the current page
    const delta = 2;

    const pages: (number | '...')[] = [];

    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(total - 1, current + delta);

    pages.push(1);

    if (rangeStart > 2) pages.push('...');

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < total - 1) pages.push('...');

    if (total > 1) pages.push(total);

    return pages;
  });

  goToPage(page: number) {
    let offset = (page - 1) * this.PAGE_SIZE;
    if (offset > this.MAX_OFFSET) {
      offset = this.MAX_OFFSET;
    }
    this.offset.set(offset);
  }

  prevPage() {
    const prev = this.offset() - this.limit();
    this.offset.set(prev < 0 ? 0 : prev);
  }
 
  nextPage() {
    const next = this.offset() + this.limit();
    if (next > this.MAX_OFFSET) {
      this.offset.set(this.MAX_OFFSET);
      return;
    }
    this.offset.set(next);
  }
}
