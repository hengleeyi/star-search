import useFilms from './useFilms';
import usePeople from './usePeople';
import usePlanets from './usePlanets';
import useSpecies from './useSpecies';

export const resources = {
  films: useFilms,
  people: usePeople,
  planets: usePlanets,
  species: useSpecies,
};
