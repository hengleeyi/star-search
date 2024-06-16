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
  const pageData = data?.pages[0]
  useUpdateResDataStates('species', pageData, updateResDataStates);

  return <SuggestionList data={pageData} title="Species" searchTerm={searchTerm}/>;
});

export default SpeciesSuggestion;
