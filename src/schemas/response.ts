import { z } from "zod";
import { peopleSchema, planetSchema, specieSchema, filmSchema } from "./resources";

export const baseResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(z.any()),
});

export const peopleResponseSchema = baseResponseSchema.extend({
    results: z.array(peopleSchema),
});

export const planetsResponseSchema = baseResponseSchema.extend({
    results: z.array(planetSchema),
});

export const speciesResponseSchema = baseResponseSchema.extend({
    results: z.array(specieSchema),
});

export const filmsResponseSchema = baseResponseSchema.extend({
    results: z.array(filmSchema),
});
