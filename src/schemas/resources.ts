import { z } from "zod";

type IPeopleType = {
  birth_year: string;
  eye_color: string;
  films: (string | IFilmType)[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string | IPlanetType;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: (string | ISpecieType)[];
  starships: (string | IStarshipType)[];
  url: string;
  vehicles: (string | IVehicleType)[];
};

type IPlanetType = {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: (string | IFilmType)[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: (string | IPeopleType)[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};

type ISpecieType = {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string | null;
  language: string;
  name: string;
  people: (string | IPeopleType)[];
  films: (string | IFilmType)[];
  skin_colors: string;
  url: string;
};

type IStarshipType = {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: (string | IFilmType)[];
  pilots: (string | IPeopleType)[];
  starship_class: string;
  url: string;
};

type IVehicleType = {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: (string | IPeopleType)[];
  films: (string | IFilmType)[];
  url: string;
  vehicle_class: string;
};

type IFilmType = {
  characters: (string | IPeopleType)[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: (string | IPlanetType)[];
  producer: string;
  release_date: string;
  species: (string | ISpecieType)[];
  starships: (string | IStarshipType)[];
  title: string;
  url: string;
  vehicles: (string | IVehicleType)[];
};

export const peopleSchema: z.ZodType<IPeopleType> = z.lazy(() => z.object({
  birth_year: z.string(),
  eye_color: z.string(),
  films: z.union([z.array(z.string()), z.array(z.lazy(() => filmSchema))]),
  gender: z.string(),
  hair_color: z.string(),
  height: z.string(),
  homeworld: z.union([z.string(), z.lazy(() => planetSchema)]),
  mass: z.string(),
  name: z.string(),
  skin_color: z.string(),
  created: z.string(),
  edited: z.string(),
  species: z.union([z.array(z.string()), z.array(z.lazy(() => specieSchema))]),
  starships: z.union([z.array(z.string()), z.array(z.lazy(() => starshipSchema))]),
  url: z.string(),
  vehicles: z.union([z.array(z.string()), z.array(z.lazy(() => vehicleSchema))]),
}));

export const planetSchema: z.ZodType<IPlanetType> = z.lazy(() => z.object({
  climate: z.string(),
  created: z.string(),
  diameter: z.string(),
  edited: z.string(),
  films: z.union([z.array(z.string()), z.array(z.lazy(() => filmSchema))]),
  gravity: z.string(),
  name: z.string(),
  orbital_period: z.string(),
  population: z.string(),
  residents: z.union([z.array(z.string()), z.array(z.lazy(() => peopleSchema))]),
  rotation_period: z.string(),
  surface_water: z.string(),
  terrain: z.string(),
  url: z.string(),
}));

export const specieSchema: z.ZodType<ISpecieType> = z.lazy(() => z.object({
  average_height: z.string(),
  average_lifespan: z.string(),
  classification: z.string(),
  created: z.string(),
  designation: z.string(),
  edited: z.string(),
  eye_colors: z.string(),
  hair_colors: z.string(),
  homeworld: z.string().nullable(),
  language: z.string(),
  name: z.string(),
  people: z.union([z.array(z.string()), z.array(z.lazy(() => peopleSchema))]),
  films: z.union([z.array(z.string()), z.array(z.lazy(() => filmSchema))]),
  skin_colors: z.string(),
  url: z.string(),
}));

const starshipSchema: z.ZodType<IStarshipType> = z.lazy(() => z.object({
  MGLT: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  cost_in_credits: z.string(),
  created: z.string(),
  crew: z.string(),
  edited: z.string(),
  hyperdrive_rating: z.string(),
  length: z.string(),
  manufacturer: z.string(),
  max_atmosphering_speed: z.string(),
  model: z.string(),
  name: z.string(),
  passengers: z.string(),
  films: z.union([z.array(z.string()), z.array(z.lazy(() => filmSchema))]),
  pilots: z.union([z.array(z.string()), z.array(z.lazy(() => peopleSchema))]),
  starship_class: z.string(),
  url: z.string(),
}));

const vehicleSchema: z.ZodType<IVehicleType> = z.lazy(() => z.object({
  cargo_capacity: z.string(),
  consumables: z.string(),
  cost_in_credits: z.string(),
  created: z.string(),
  crew: z.string(),
  edited: z.string(),
  length: z.string(),
  manufacturer: z.string(),
  max_atmosphering_speed: z.string(),
  model: z.string(),
  name: z.string(),
  passengers: z.string(),
  pilots: z.union([z.array(z.string()), z.array(z.lazy(() => peopleSchema))]),
  films: z.union([z.array(z.string()), z.array(z.lazy(() => filmSchema))]),
  url: z.string(),
  vehicle_class: z.string(),
}));

export const filmSchema: z.ZodType<IFilmType> = z.lazy(() => z.object({
  characters: z.union([z.array(z.string()), z.array(z.lazy(() => peopleSchema))]),
  created: z.string(),
  director: z.string(),
  edited: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  planets: z.union([z.array(z.string()), z.array(z.lazy(() => planetSchema))]),
  producer: z.string(),
  release_date: z.string(),
  species: z.union([z.array(z.string()), z.array(z.lazy(() => specieSchema))]),
  starships: z.union([z.array(z.string()), z.array(z.lazy(() => starshipSchema))]),
  title: z.string(),
  url: z.string(),
  vehicles: z.union([z.array(z.string()), z.array(z.lazy(() => vehicleSchema))]),
}));

// const ResourcesType = z.enum([
//   'films',
//   'people',
//   'planets',
//   'species',
//   'starships',
//   'vehicles',
// ]);