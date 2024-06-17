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
    <div className="mx-8 flex flex-col items-center">
      <header className='h-48 flex items-center'>
        <h1 className='text-4xl font-bold text-violet-900'>Star Wars Search</h1>
      </header>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search.."
        className="w-full md:w-10/12 search-input"
      />
      {deferredSearchTerm && (
        <Suggestions
          searchTerm={deferredSearchTerm}
          resultStatus={resultStatus}
          updateResDataStates={updateResDataStates}
        />
      )}
    </div>
  );
};

export default Home;
