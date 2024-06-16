import clsx from 'clsx';
import { DisplayMode } from '../CategoryPage';
import { People } from '../schemas/response';

type PeopleCardProps = {
  data: People;
  mode: DisplayMode;
};

const PeopleCard = ({ data, mode }: PeopleCardProps) => {
  const isGrid = mode === 'grid';
  return (
    <section
      className={clsx(
        'border border-slate-300 rounded-md p-6',
        !isGrid && 'grid gap-4 grid-cols-3'
      )}
    >
      <h4 className={clsx('font-bold', isGrid && 'text-xl', !isGrid && 'text-xl')}>{data.name}</h4>
      <ul className={clsx(isGrid && 'mt-4')}>
        <li className={clsx('flex', !isGrid && 'flex-col')}>
          <h4 className="font-semibold">Gender:</h4>
          <p>{data.gender}</p>
        </li>
        <li className={clsx('flex', !isGrid && 'flex-col')}>
          <h4 className="font-semibold">Birthday Year:</h4>
          <p>{data.birth_year}</p>
        </li>
      </ul>
      <div className={clsx('flex gap-2 flex-wrap', isGrid && 'mt-4')}>
        <button className="btn">Edit</button>
        <button className="btn-alert">Delete</button>
      </div>
    </section>
  );
};

export default PeopleCard;
