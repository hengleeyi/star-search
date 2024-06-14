import { useEffect } from 'react';
import { ResourceKeys } from '../components/SearchProvider';
import { z } from 'zod';
import { baseResponseSchema } from '../schemas/response';

type BaseResponseSchema = z.infer<typeof baseResponseSchema>;

function useUpdateResDataStates(
  name: ResourceKeys,
  data: BaseResponseSchema | undefined,
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void
) {
  useEffect(() => {
    if (data) {
      if (data.results.length === 0) {
        updateResDataStates(name, false);
      } else {
        updateResDataStates(name, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}

export default useUpdateResDataStates;
