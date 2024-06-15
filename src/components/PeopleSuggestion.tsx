import { memo } from 'react';
import usePeople from '../hooks/queries/usePeople';
import { ResourceKeys } from './SearchProvider';
import SuggestionList from './SuggestionList';
import useUpdateResDataStates from '../hooks/useUpdateResDataStates';

type PeopleSuggestionProps = {
  searchTerm: string;
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void;
};

const PeopleSuggestion = memo(({ searchTerm, updateResDataStates }: PeopleSuggestionProps) => {
  const { data } = usePeople(searchTerm);
  useUpdateResDataStates('people', data, updateResDataStates);

  return <SuggestionList data={data} title="People" searchTerm={searchTerm}/>;
});

export default PeopleSuggestion;
