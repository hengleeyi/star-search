import React, { useState } from 'react';
import { useSearch } from './components/SearchProvider';
import useDebounce from './hooks/useDebounce';
import Suggestions from './components/Suggestions';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { updateResDataStates, resultStatus } = useSearch();
  const deferredSearchTerm = useDebounce(searchTerm, 200);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateResDataStates('people', null);
    updateResDataStates('planets', null);
    updateResDataStates('species', null);
    const value = e.target.value;
    setSearchTerm(value);
  };
  return (
    <div className="m-auto w-10/12 flex flex-col items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search.."
        className="text-md mt-64 w-10/12 rounded-md bg-slate-100 p-2"
      />

      {/* <Suspense fallback={<p>wating all ...</p>}> */}
      {deferredSearchTerm && (
        <Suggestions
          searchTerm={deferredSearchTerm}
          resultStatus={resultStatus}
          updateResDataStates={updateResDataStates}
        />
      )}
      {/* </Suspense> */}
    </div>
  );
};

export default Home;