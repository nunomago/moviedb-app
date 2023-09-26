/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import { parseQueryParamToString } from '@utils/helpers';
import { useMovie } from '@queries/movie';
import Spinner from '@components/atoms/Spinner';
import Layout from '@components/organisms/Layout';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';

export default function Movie() {
  const { query: { id } } = useRouter();
  const movieId = parseQueryParamToString(id);
  const { data: movie, isLoading: isMovieLoading } = useMovie(movieId);

  if (isMovieLoading) return (<Spinner />);
  if (!movie) {
    return (
      <Layout>
        <p>Error</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="my-8 md:my-12 px-6 max-w-5xl flex-1 md:flex gap-4 overflow-hidden relative">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width={256}
          height={256}
          alt=""
          className="mx-auto"
        />
        <div>
          <h1 className="text-center md:text-left text-2xl md:text-5xl font-medium mt-2 dark:text-slate-50">{movie.title}</h1>
          <div className="mt-8 mx-auto flex flex-row gap-2 flex-wrap justify-center md:justify-start overflow-hidden">
            <p className="px-2 bg-slate-400 rounded-md text-slate-50">{new Date(movie.release_date).getFullYear()}</p>
            <p className="px-2 bg-slate-400 rounded-md text-slate-50">
              {movie.runtime}
              {' '}
              min
            </p>
            {movie.genres
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((g) => (
                <p key={g.id} className="px-2 bg-blue-400 rounded-md text-slate-50">
                  {g.name}
                </p>
              ))}
          </div>
          <div className="flex flex-row justify-center md:justify-start mt-4">
            {movie.vote_average
             && [...Array(Math.round((5 * movie.vote_average) / 10))]
               .map((_, index) => (
                 <StarIcon key={`star-${index}`} className="h-5 w-5 text-yellow-500" />
               ))}
            <p className="text-xs text-slate-500 dark:text-slate-300 self-center">
              (
              {movie.vote_count}
              {' '}
              votes)
            </p>
          </div>
          <p className="mt-2 text-slate-700 dark:text-slate-50">{movie.overview}</p>
        </div>
      </div>
    </Layout>
  );
}
