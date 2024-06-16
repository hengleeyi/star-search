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
  const pageData = data?.pages[0]
  useUpdateResDataStates('people', pageData, updateResDataStates);

  return <SuggestionList data={pageData} title="People" searchTerm={searchTerm}/>;
});

export default PeopleSuggestion;
