/* eslint-disable import/prefer-default-export */
import { Movie } from '@interfaces/Movie';
import getConfig from 'next/config';
import { UseQueryResult, useQuery } from 'react-query';

const { publicRuntimeConfig } = getConfig();

export const useMovie = (id: string): UseQueryResult<Movie> => useQuery(
  ['movie', id],
  () => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${publicRuntimeConfig.apiKey}`)
    .then((response) => response.json()),
);
