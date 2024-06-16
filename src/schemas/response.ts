import { z } from 'zod';
import { peopleSchema, planetSchema, specieSchema, filmSchema } from './resources';

export const baseResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.any()),
});

export type BaseResponse = z.infer<typeof baseResponseSchema>;

export const peopleResponseSchema = baseResponseSchema.extend({
  results: z.array(peopleSchema),
});

export type PeopleResponse = z.infer<typeof peopleResponseSchema>;

export type People = z.infer<typeof peopleSchema>;

export const planetsResponseSchema = baseResponseSchema.extend({
  results: z.array(planetSchema),
});

export type Planet = z.infer<typeof planetSchema>;

export const speciesResponseSchema = baseResponseSchema.extend({
  results: z.array(specieSchema),
});

export type Species = z.infer<typeof specieSchema>;

export const filmsResponseSchema = baseResponseSchema.extend({
  results: z.array(filmSchema),
});

export type Film = z.infer<typeof filmSchema>;

export type ResourceResponseMap = {
  people: z.infer<typeof peopleResponseSchema>;
  planets: z.infer<typeof planetsResponseSchema>;
  species: z.infer<typeof speciesResponseSchema>;
  films: z.infer<typeof filmsResponseSchema>;
};

export type ResourceResponseType = keyof ResourceResponseMap;
