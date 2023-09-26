/* eslint-disable import/prefer-default-export */
import { SearchPage } from '@interfaces/MovieSearch';
import { UseQueryResult, useQuery } from 'react-query';

const apiKey = process.env.API_KEY;

export const useSearch = (query: string): UseQueryResult<SearchPage> => useQuery(
  ['search', query],
  () => fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`)
    .then((response) => response.json())
    .then((response: SearchPage) => {
      const sortedByPopularity = response.results
        .sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
      // return new Promise((res) => {
      //   setTimeout(() => {
      //     res({ ...response, results: sortedByPopularity });
      //   }, 5000);
      // });
      return { ...response, results: sortedByPopularity };
    }),
  {
    enabled: (!!query),
    refetchOnWindowFocus: false,
  },
);
