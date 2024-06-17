import { memo } from 'react';
import { ResourceKeys } from './SearchProvider';
import SuggestionList from './SuggestionList';
import useUpdateResDataStates from '../hooks/useUpdateResDataStates';
import useStarships from '../hooks/queries/useStarships';

type StarshipsSuggestionProps = {
  searchTerm: string;
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void;
};

const StarshipsSuggestion = memo(
  ({ searchTerm, updateResDataStates }: StarshipsSuggestionProps) => {
    const { data } = useStarships(searchTerm);
    const pageData = data?.pages[0];
    useUpdateResDataStates('starships', pageData, updateResDataStates);

    return <SuggestionList data={pageData} title="Starships" searchTerm={searchTerm} />;
  }
);

export default StarshipsSuggestion;
