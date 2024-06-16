import { peopleResponseSchema } from '../../schemas/response';
import { useInfiniteQuery } from '@tanstack/react-query';

const usePeople = (searchTerm: string | null) => {
  return useInfiniteQuery({
    queryKey: ['people', searchTerm],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`${pageParam}`);
      const data = await response.json();
      const validation = peopleResponseSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error('Incorrect data format');
      }
    },
    initialPageParam: `https://swapi.dev/api/people/?search=${searchTerm}`,
    staleTime: 30 * 1000,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

export default usePeople;
