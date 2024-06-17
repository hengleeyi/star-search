import { starshipsResponseSchema } from '../../schemas/response';
import { useInfiniteQuery } from '@tanstack/react-query';

const useStarships = (searchTerm: string | null) => {
  return useInfiniteQuery({
    queryKey: ['starships', searchTerm],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`${pageParam}`);
      const data = await response.json();
      const validation = starshipsResponseSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error('Incorrect data format');
      }
    },
    initialPageParam: `https://swapi.dev/api/starships/?search=${searchTerm}`,
    staleTime: 30 * 1000,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

export default useStarships;
