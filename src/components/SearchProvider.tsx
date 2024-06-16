import { createContext, useCallback, useContext, useMemo } from 'react';
import { checkResultStatus } from '../lib/utils';
import { useImmer } from 'use-immer';

const initNotFoundStates = { people: null, planets: null, species: null, films: null };
export type ResourceKeys = keyof typeof initNotFoundStates;
export type ResDataStates = Record<ResourceKeys, boolean | null>;
export type ResultStatus = 'init' | 'hasData' | 'noData' | 'someData';
type SearchContextType = {
  resultStatus: ResultStatus;
  updateResDataStates: (key: ResourceKeys, value: boolean | null) => void;
  resDataStates: ResDataStates;
};
const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [resDataStates, setResDataStates] = useImmer<ResDataStates>(initNotFoundStates);
  const resultStatus = checkResultStatus(resDataStates);

  const updateResDataStates = useCallback(
    (key: ResourceKeys, value: boolean | null) => {
      setResDataStates((draft) => {
        draft[key] = value;
      });
    },
    [setResDataStates]
  );

  const initValue = useMemo(
    () => ({ resultStatus, updateResDataStates, resDataStates }),
    [resultStatus, updateResDataStates, resDataStates]
  );

  return <SearchContext.Provider value={initValue}>{children}</SearchContext.Provider>;
};

const useSearch = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error('Please use <SearchProvider />');
  }

  return context;
};
// eslint-disable-next-line react-refresh/only-export-components
export { SearchProvider, useSearch };
