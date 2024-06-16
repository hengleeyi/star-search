import { memo } from 'react';
import { ResourceKeys } from './SearchProvider';
import SuggestionList from './SuggestionList';
import useUpdateResDataStates from '../hooks/useUpdateResDataStates';
import useFilms from '../hooks/queries/useFilms';

type FilmsSuggestionProps = {
  searchTerm: string;
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void;
};

const FilmsSuggestion = memo(({ searchTerm, updateResDataStates }: FilmsSuggestionProps) => {
  const { data } = useFilms(searchTerm);
  const pageData = data?.pages[0]
  useUpdateResDataStates('films', pageData, updateResDataStates);

  return <SuggestionList data={pageData} title="Films" searchTerm={searchTerm}/>;
});

export default FilmsSuggestion;
