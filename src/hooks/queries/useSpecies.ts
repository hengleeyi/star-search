import { speciesResponseSchema } from '../../schemas/response';
import { useInfiniteQuery } from '@tanstack/react-query';

const useSpecies = (searchTerm: string | null) => {
  return useInfiniteQuery({
    queryKey: ['species', searchTerm],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`${pageParam}`);
      const data = await response.json();
      const validation = speciesResponseSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error('Incorrect data format');
      }
    },
    initialPageParam: `https://swapi.dev/api/species/?search=${searchTerm}`,
    retry: 1,
    staleTime: 30 * 1000,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

export default useSpecies;
