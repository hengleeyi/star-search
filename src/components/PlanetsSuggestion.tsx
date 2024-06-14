import { memo } from 'react';
import { ResourceKeys } from './SearchProvider';
import SuggestionList from './SuggestionList';
import usePlanets from '../hooks/queries/usePlanets';
import useUpdateResDataStates from '../hooks/useUpdateResDataStates';

type PlanetsSuggestionProps = {
  searchTerm: string;
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void;
};

const PlanetsSuggestion = memo(({ searchTerm, updateResDataStates }: PlanetsSuggestionProps) => {
  const { data } = usePlanets(searchTerm);
  updateResDataStates('planets', false);
  useUpdateResDataStates('planets', data, updateResDataStates);

  return <SuggestionList data={data} title="Planets" />;
});

export default PlanetsSuggestion;
