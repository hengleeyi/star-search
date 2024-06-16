import clsx from 'clsx';
import { DisplayMode } from '../CategoryPage';
import { People, ResourceResponseMap, ResourceResponseType } from '../schemas/response';
import GridCard from './GridCard';
import { InfiniteData } from '@tanstack/react-query';
import React from 'react';

type GridCardsProps<T extends ResourceResponseType> = {
  type: T;
  data: InfiniteData<ResourceResponseMap[T]>;
  mode: DisplayMode;
};

function GridCards<T extends ResourceResponseType>({ data, type, mode }: GridCardsProps<T>) {
  const isGrid = mode === 'grid';
  return (
    <div
      className={clsx(
        'grid gap-4',
        isGrid && 'grid-cols-2 md:grid-cols-4',
        !isGrid && 'grid-cols-1'
      )}
    >
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.results.map((card) => {
            let cardId = '';
            if (type === 'people') {
              cardId = (card as People).name;
            }
            return <GridCard key={cardId} type={type} data={card} mode={mode} />;
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

export default GridCards;
