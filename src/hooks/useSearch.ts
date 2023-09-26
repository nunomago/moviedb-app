import { useEffect, useState } from 'react';
import { useSearchMovie } from '@queries/search';
import useDebounced from './useDebounced';

/* eslint-disable import/prefer-default-export */
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounced(searchQuery, 300);
  const {
    data: searchResults,
    isLoading: isSearchQueryLoading,
  } = useSearchMovie(debouncedSearchQuery);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const onSearchButtonClick = () => {
    setIsSearchModalOpen(((prevState) => !prevState));
  };
  const searchModalKeyboardShortcutToggle = () => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchModalOpen((prevState) => !prevState);
      }
    };
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  };
  useEffect(searchModalKeyboardShortcutToggle, []);
  return {
    debouncedSearchQuery,
    isSearchModalOpen,
    isSearchQueryLoading,
    onSearchButtonClick,
    searchResults,
    setIsSearchModalOpen,
    setSearchQuery,
  };
};
