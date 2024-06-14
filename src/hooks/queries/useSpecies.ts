import { speciesResponseSchema } from '../../schemas/response';
import { useQuery } from '@tanstack/react-query';

const useSpecies = (searchTerm: string | null) => {
  return useQuery({
    queryKey: ['species', searchTerm],
    queryFn: async () => {
      const response = await fetch(`https://swapi.dev/api/species/?search=${searchTerm}`);
      const data = await response.json();
      const validation = speciesResponseSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error('Incorrect data format');
      }
    },
    retry: 1,
    staleTime: 30 * 1000,
  });
};

export default useSpecies;
