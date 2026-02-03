import { Routes } from '@angular/router';
import { List } from './list/list';
import Details from './details/details';
import { PokemonExistsGuard } from './core/services/PokemonExistsGuard ';
import { PokemonNotFound } from './details/pokemon-not-found/pokemon-not-found/pokemon-not-found';

export const routes: Routes = [
  {
    path: '',
    component: List
  },
  {
    path: 'pokemon/:id',
    component: Details, 
    canActivate: [PokemonExistsGuard],
  },
  {
    path: 'pokemon-not-found/:id',
    component: PokemonNotFound,
  },
  {
    path: '**',
    redirectTo: 'pokemon-not-found/unknown',
    pathMatch: 'full',
  },
];

