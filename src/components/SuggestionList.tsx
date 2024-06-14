import { memo } from 'react';

type Item = {
  name?: string;
  title?: string;
};

type SuggestionListProps = {
  title: string;
  data: { results: Item[] } | undefined;
};

const SuggestionList = memo(({ data, title }: SuggestionListProps) => {
  return (
    <>
      {data && data.results.length > 0 && (
        <section>
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
          <a className="text-sm py-1 px-4">View more</a>
        </section>
      )}
    </>
  );
});

export default SuggestionList;
