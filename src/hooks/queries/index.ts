import useFilms from './useFilms';
import usePeople from './usePeople';
import usePlanets from './usePlanets';
import useSpecies from './useSpecies';
import useStarships from './useStarships';
import useVehicles from './useVehicles';

export const resources = {
  films: useFilms,
  people: usePeople,
  planets: usePlanets,
  species: useSpecies,
  vehicles: useVehicles,
  starships: useStarships,
};
