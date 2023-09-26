/* eslint-disable react/no-array-index-key */
import { StarIcon } from '@heroicons/react/20/solid';
import { Movie } from '@interfaces/MovieSearch';
import Image from 'next/image';

type Props = {
  activeOption: Movie
};

export default function SearchModalResultPreview({ activeOption }: Props) {
  return (
    <div
      className={`hidden w-1/2 flex-none flex-col divide-y divide-gray-100
        dark:divide-slate-600 overflow-y-auto sm:flex`}
    >
      <div className="flex-none p-6 text-center">
        <Image
          src={`https://image.tmdb.org/t/p/w500${activeOption.poster_path}`}
          width={256}
          height={256}
          alt=""
          className="mx-auto h-16 w-16 rounded-full"
        />
        <h2 className="mt-3 font-semibold text-slate-800 dark:text-slate-50">{activeOption.title}</h2>
        <p className="text-sm leading-6 text-gray-500 dark:text-slate-100">
          {`${activeOption.overview.slice(0, 150)}...`}
        </p>
      </div>
      <div className="flex flex-auto flex-col justify-between p-6">
        <dl
          className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-slate-50"
        >
          <dt className="col-end-1 font-semibold">Year</dt>
          <dd>{new Date(activeOption.release_date).getFullYear()}</dd>
          <dd>{activeOption.genre_ids}</dd>
          <dt className="col-end-1 font-semibold">Vote Average</dt>
          <dd className="flex flex-row">
            {activeOption.vote_average
             && [...Array(Math.round((5 * activeOption.vote_average) / 10))]
               .map((star, index) => (
                 <StarIcon key={`star-${index}`} className="h-5 w-5" />
               ))}
          </dd>
          <dt className="col-end-1 font-semibold">Vote Count</dt>
          <dd>{activeOption.vote_count}</dd>
        </dl>
        <button
          type="button"
          className={`mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
            text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600`}
        >
          Send message
        </button>
      </div>
    </div>
  );
}
