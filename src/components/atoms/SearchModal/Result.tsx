import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import Image from 'next/image';
import { classNames } from '@utils/helpers';
import { Movie } from '@interfaces/MovieSearch';

type Props = {
  movie: Movie
};

export default function SearchModalResult({ movie }: Props) {
  return (
    <Combobox.Option
      as="div"
      key={movie.id}
      value={movie}
      className={({ active }) => classNames(
        'flex cursor-default select-none items-center rounded-md p-2',
        active && 'bg-slate-100 text-slate-900 dark:text-slate-700',
      )}
    >
      {({ active }) => (
        <>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={256}
            height={256}
            alt=""
            className="h-6 w-6 flex-none rounded-full"
          />
          <span className="ml-3 flex-auto truncate">{movie.title}</span>
          {active && (
          <ChevronRightIcon
            className="ml-3 h-5 w-5 flex-none text-gray-400 dark:text-slate-600"
            aria-hidden="true"
          />
          )}
        </>
      )}
    </Combobox.Option>
  );
}
