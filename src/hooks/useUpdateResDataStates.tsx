import { useEffect } from 'react';
import { ResourceKeys } from '../components/SearchProvider';
import { BaseResponse } from '../schemas/response';

function useUpdateResDataStates(
  name: ResourceKeys,
  data: BaseResponse | undefined,
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
