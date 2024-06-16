import { memo } from 'react';
import { Link } from 'react-router-dom';

type Item = {
  name?: string;
  title?: string;
};

type SuggestionListProps = {
  searchTerm: string;
  title: string;
  data: { results: Item[] } | undefined;
};

const SuggestionList = memo(({ data, title, searchTerm }: SuggestionListProps) => {
  return (
    <>
      {data && data.results.length > 0 && (
        <section className="text-md">
          <h3 className="font-bold py-1 px-2">{title}</h3>
          <ul>
            {data.results.slice(0, 3).map((item) => {
              const name = item.name || item.title;

              return (
                <li className="py-1 px-4" key={name}>
                  {name}
                </li>
              );
            })}
          </ul>
          {title === 'People' ? (
            <Link
              className="text-sm py-1 px-4 text-violet-500 hover:underline"
              to={`categories/${title.toLowerCase()}?search=${searchTerm}`}
            >
              View more
            </Link>
          ) : (
            <a className="text-sm py-1 px-4 text-violet-500 hover:underline cursor-pointer">
              View more
            </a>
          )}
        </section>
      )}
    </>
  );
});

export default SuggestionList;
