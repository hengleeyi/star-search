import { useParams, useSearchParams } from 'react-router-dom';
import { resources } from './hooks/queries';
import { ResourceKeys } from './components/SearchProvider';
import GridCards from './components/GridCards';
import { useState } from 'react';
import clsx from 'clsx';

export type DisplayMode = 'grid' | 'list';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  const useResource = resources[categoryName as ResourceKeys];
  const [displayMode, setdisplayMode] = useState<DisplayMode>('grid');
  const { data } = useResource(searchTerm);
  console.log('🚀 ~ CategoryPage ~ data:', data);
  const isGrid = displayMode === 'grid';

  if (!data) return null;

  return (
    <div className="m-auto w-10/12 flex flex-col">
      <h1 className="text-3xl py-4">Category</h1>
      <section className="flex py-4 justify-end gap-4">
        <button
          className={clsx('tab', isGrid && 'tab-active')}
          onClick={() => setdisplayMode('grid')}
        >
          Grid
        </button>
        <button
          className={clsx('tab', !isGrid && 'tab-active')}
          onClick={() => setdisplayMode('list')}
        >
          List
        </button>
      </section>
      <GridCards data={data} type={categoryName as ResourceKeys} mode={displayMode} />
    </div>
  );
};

export default CategoryPage;
