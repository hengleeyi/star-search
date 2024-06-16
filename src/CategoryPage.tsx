import { useParams, useSearchParams } from 'react-router-dom';
import { resources } from './hooks/queries';
import { ResourceKeys } from './components/SearchProvider';
import GridCards from './components/GridCards';
import { useState } from 'react';
import clsx from 'clsx';

export type DisplayMode = 'grid' | 'list';

const CategoryPage = () => {
  const { categoryName = 'Category' } = useParams();
  const capital = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  const useResource = resources[categoryName as ResourceKeys];
  const [displayMode, setdisplayMode] = useState<DisplayMode>('grid');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useResource(searchTerm);
  const isGrid = displayMode === 'grid';

  if (!data) return null;

  return (
    <>
      <div className="mx-4 flex flex-col md:mx-8">
        <h1 className="text-3xl py-4">{`${capital} name includes '${searchTerm}'`}</h1>
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
        {!hasNextPage && (
          <p className="text-slate-400 w-full text-2xl text-center px-4 py-6">
            Nothing more to load
          </p>
        )}
      </div>
      <div className="fixed bottom-4 w-full px-4 md:px-8">
        {hasNextPage && (
          <button
            className="w-full load-more-btn"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
