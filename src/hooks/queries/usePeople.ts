import { peopleResponseSchema } from '../../schemas/response';
import { useQuery } from '@tanstack/react-query';

const usePeople = (searchTerm: string | null) => {
  return useQuery({
    queryKey: ['people', searchTerm],
    queryFn: async () => {
      const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);
      const data = await response.json();
      const validation = peopleResponseSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error('Incorrect data format');
      }
    },
    staleTime: 30 * 1000,
  });
};

export default usePeople;
