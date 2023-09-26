/* eslint-disable import/prefer-default-export */
import { SearchPage } from '@interfaces/MovieSearch';
import getConfig from 'next/config';
import { UseQueryResult, useQuery } from 'react-query';

const { publicRuntimeConfig } = getConfig();

export const useSearchMovie = (query: string): UseQueryResult<SearchPage> => useQuery(
  ['search', query],
  () => fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${publicRuntimeConfig.apiKey}`)
    .then((response) => response.json())
    .then((response: SearchPage) => {
      const sortedByPopularity = response.results
        .sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
      return { ...response, results: sortedByPopularity };
    }),
  {
    enabled: (!!query),
    refetchOnWindowFocus: false,
  },
);
