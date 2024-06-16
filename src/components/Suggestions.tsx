import { Suspense, lazy, memo } from 'react';
import { ResourceKeys, ResultStatus } from './SearchProvider';
import { useIsFetching } from '@tanstack/react-query';

const PeopleSuggestion = lazy(() => import('./PeopleSuggestion'));
const PlanetsSuggestion = lazy(() => import('./PlanetsSuggestion'));
const SpeciesSuggestion = lazy(() => import('./SpeciesSuggestion'));
const FilmsSuggestion = lazy(() => import('./FilmsSuggestion'));

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
      <Suspense fallback={<div className="py-1 px-2 text-violet-800">Loading ...</div>}>
        <PeopleSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
      </Suspense>
      <Suspense>
        <PlanetsSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
      </Suspense>
      <Suspense>
        <SpeciesSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
      </Suspense>
      <Suspense>
        <FilmsSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
      </Suspense>
      {isLoading && <div className="py-1 px-2 text-violet-800">Loading ...</div>}
      {showNotFound && <div className="py-1 px-2">Not Found :'(</div>}
    </div>
  );
});

export default Suggestions;
