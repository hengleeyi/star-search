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
  const pageData = data?.pages[0]
  useUpdateResDataStates('planets', pageData, updateResDataStates);

  return <SuggestionList data={pageData} title="Planets" searchTerm={searchTerm}/>;
});

export default PlanetsSuggestion;
