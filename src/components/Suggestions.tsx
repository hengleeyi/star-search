import { Suspense, lazy, memo } from 'react';
import { ResourceKeys, ResultStatus } from './SearchProvider';
import { useIsFetching } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const PeopleSuggestion = lazy(() => import('./PeopleSuggestion'));
const PlanetsSuggestion = lazy(() => import('./PlanetsSuggestion'));
const SpeciesSuggestion = lazy(() => import('./SpeciesSuggestion'));
const FilmsSuggestion = lazy(() => import('./FilmsSuggestion'));
const VehiclesSuggestion = lazy(() => import('./VehiclesSuggestion'));
const StarshipsSuggestion = lazy(() => import('./StarshipsSuggestion'));

type SuggestionsProps = {
  searchTerm: string;
  resultStatus: ResultStatus;
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void;
};

const Suggestions = memo(({ searchTerm, resultStatus, updateResDataStates }: SuggestionsProps) => {
  const isFetchingPeople = useIsFetching({ queryKey: ['people', searchTerm] });
  const isFetchingPlanets = useIsFetching({ queryKey: ['planets', searchTerm] });
  const isFetchingSpecies = useIsFetching({ queryKey: ['species', searchTerm] });
  const isFetchingFilms = useIsFetching({ queryKey: ['films', searchTerm] });
  const isFetchingVehicles = useIsFetching({ queryKey: ['vehicles', searchTerm] });
  const isFetchingStarships = useIsFetching({ queryKey: ['starships', searchTerm] });
  const isLoading =
    !!isFetchingPeople ||
    !!isFetchingPlanets ||
    !!isFetchingSpecies ||
    !!isFetchingFilms ||
    !!isFetchingVehicles ||
    !!isFetchingStarships;
  const showNotFound = resultStatus === 'noData';

  return (
    <div className="mt-4 w-full md:w-10/12 border border-violet-500 rounded-lg max-h-96 overflow-y-auto p-2 shadow-md">
      <ErrorBoundary
        fallback={<div className="py-1 px-2">Something went wrong, pleaase search later.</div>}
      >
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
        <Suspense>
          <VehiclesSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
        </Suspense>
        <Suspense>
          <StarshipsSuggestion searchTerm={searchTerm} updateResDataStates={updateResDataStates} />
        </Suspense>
        {!isLoading && resultStatus === 'init' && (
          <div className="py-1 px-2 text-violet-800">Loading ...</div>
        )}
        {isLoading && <div className="py-1 px-2 text-violet-800">Loading ...</div>}
        {showNotFound && <div className="py-1 px-2">Not Found :'(</div>}
      </ErrorBoundary>
    </div>
  );
});

export default Suggestions;
