import { memo } from 'react';
import { ResourceKeys } from './SearchProvider';
import SuggestionList from './SuggestionList';
import useSpecies from '../hooks/queries/useSpecies';
import useUpdateResDataStates from '../hooks/useUpdateResDataStates';

type SpeciesSuggestionProps = {
  searchTerm: string;
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void;
};

const SpeciesSuggestion = memo(({ searchTerm, updateResDataStates }: SpeciesSuggestionProps) => {
  const { data } = useSpecies(searchTerm);
  useUpdateResDataStates('species', data, updateResDataStates);

  return <SuggestionList data={data} title="Species" />;
});

export default SpeciesSuggestion;
