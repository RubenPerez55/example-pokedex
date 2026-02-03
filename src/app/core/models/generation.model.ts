import { PokemonSpecies } from "./pokemon-species.model";

export interface Generation {
    id: number;
    name: string;
    pokemon_species: PokemonSpecies[];
}