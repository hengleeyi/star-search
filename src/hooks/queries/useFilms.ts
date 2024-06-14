import { filmsResponseSchema } from '../../schemas/response';
import { useQuery } from '@tanstack/react-query';

const useFilms = (searchTerm: string | null) => {
  return useQuery({
    queryKey: ['films', searchTerm],
    queryFn: async () => {
      const response = await fetch(`https://swapi.dev/api/films/?search=${searchTerm}`);
      const data = await response.json();
      const validation = filmsResponseSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error('Incorrect data format');
      }
    },
    staleTime: 30 * 1000,
  });
};

export default useFilms;
