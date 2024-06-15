import { DisplayMode } from '../CategoryPage';
import { People, ResourceResponseMap, ResourceResponseType } from '../schemas/response';
import PeopleCard from './PeopleCard';

type GridCardProps<T extends ResourceResponseType> = {
  type: T;
  data: ResourceResponseMap[T]['results'][number];
  mode: DisplayMode;
};

const GridCard = <T extends ResourceResponseType>({ type, data, mode }: GridCardProps<T>) => {
  if (type === 'people') {
    return <PeopleCard data={data as People} mode={mode} />;
  }
  return <div>GridCard</div>;
};

export default GridCard;
