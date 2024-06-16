import { memo } from 'react';
import { ResourceKeys, ResultStatus } from './SearchProvider';
import PeopleSuggestion from './PeopleSuggestion';
import PlanetsSuggestion from './PlanetsSuggestion';
import SpeciesSuggestion from './SpeciesSuggestion';
import { useIsFetching } from '@tanstack/react-query';
import FilmsSuggestion from './FilmsSuggestion';

type SuggestionsProps = {
  searchTerm: string;
  resultStatus: ResultStatus;
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void;
};

const Suggestions = memo(({ searchTerm, resultStatus, updateResDataStates }: SuggestionsProps) => {
  const isFetchingPeople = useIsFetching({ queryKey: ['people'] });
  const isFetchingPlanets = useIsFetching({ queryKey: ['planets'] });
  const isFetchingSpecies = useIsFetching({ queryKey: ['species'] });
  const isLoading = !!isFetchingPeople || !!isFetchingPlanets || !!isFetchingSpecies;
  const showNotFound = resultStatus === 'noData';

  return (
    <div className="mt-4 w-full md:w-10/12 border border-violet-500 rounded-lg max-h-96 overflow-y-auto p-2 shadow-md">
      <PeopleSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
      <PlanetsSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
      <SpeciesSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
      <FilmsSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
      {isLoading && <div className="py-1 px-2 text-violet-800">Loading ...</div>}
      {showNotFound && <div className="py-1 px-2">Not Found :'(</div>}
    </div>
  );
});

export default Suggestions;
