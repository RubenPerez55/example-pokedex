import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PokeService } from './poke.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonExistsGuard implements CanActivate {

  constructor(private pokeService: PokeService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const id = Number(route.paramMap.get('id'));

    if (!id || isNaN(id)) {
      this.router.navigate(['/pokemon-not-found', 'invalid']);
      return false;
    }

    const exists = await this.pokeService.pokemonExists(id);

    if (!exists) {
      this.router.navigate(['/pokemon-not-found', id]);
      return false;
    }

    return true;
  }
}
