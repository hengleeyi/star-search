import { planetsResponseSchema } from '../../schemas/response';
import { useQuery } from '@tanstack/react-query';

const usePlanets = (searchTerm: string | null) => {
  return useQuery({
    queryKey: ['planets', searchTerm],
    queryFn: async () => {
      const response = await fetch(`https://swapi.dev/api/planets/?search=${searchTerm}`);
      const data = await response.json();
      const validation = planetsResponseSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error('Incorrect data format');
      }
    },
    staleTime: 30 * 1000,
  });
};

export default usePlanets;
