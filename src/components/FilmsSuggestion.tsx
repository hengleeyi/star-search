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
  useUpdateResDataStates('films', data, updateResDataStates);

  return <SuggestionList data={data} title="Films" searchTerm={searchTerm}/>;
});

export default FilmsSuggestion;
