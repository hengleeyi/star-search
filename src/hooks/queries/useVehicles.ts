import { vehiclesResponseSchema } from '../../schemas/response';
import { useInfiniteQuery } from '@tanstack/react-query';

const useVehicles = (searchTerm: string | null) => {
  return useInfiniteQuery({
    queryKey: ['vehicles', searchTerm],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`${pageParam}`);
      const data = await response.json();
      const validation = vehiclesResponseSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error('Incorrect data format');
      }
    },
    initialPageParam: `https://swapi.dev/api/vehicles/?search=${searchTerm}`,
    staleTime: 30 * 1000,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

export default useVehicles;
