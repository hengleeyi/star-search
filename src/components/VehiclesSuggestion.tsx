import { memo } from 'react';
import { ResourceKeys } from './SearchProvider';
import SuggestionList from './SuggestionList';
import useUpdateResDataStates from '../hooks/useUpdateResDataStates';
import useVehicles from '../hooks/queries/useVehicles';

type VehiclesSuggestionProps = {
  searchTerm: string;
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void;
};

const VehiclesSuggestion = memo(({ searchTerm, updateResDataStates }: VehiclesSuggestionProps) => {
  const { data } = useVehicles(searchTerm);
  const pageData = data?.pages[0];
  useUpdateResDataStates('vehicles', pageData, updateResDataStates);

  return <SuggestionList data={pageData} title="Vehicles" searchTerm={searchTerm} />;
});

export default VehiclesSuggestion;
