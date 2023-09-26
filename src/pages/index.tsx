import SearchButton from '@components/atoms/SearchButton';
import SearchModal from '@components/molecules/SearchModal';
import ThemeSwitcher from '@components/molecules/ThemeSwitcher';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import useDebounced from '@hooks/useDebounced';
import { useSearch } from '@queries/search';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounced(searchQuery, 300);
  const { data: searchResults, isLoading: isSearchQueryLoading } = useSearch(debouncedSearchQuery);
  const [ThemeSwitchTopButtonIcon, setThemeSwitchTopButtonIcon] = useState<typeof MoonIcon>();
  function setDarkTheme() {
    document.documentElement.classList.add('dark');
    window.localStorage.theme = 'dark';
    setThemeSwitchTopButtonIcon(MoonIcon);
  }
  function setLightTheme() {
    document.documentElement.classList.remove('dark');
    window.localStorage.theme = 'light';
    setThemeSwitchTopButtonIcon(SunIcon);
  }
  const onThemeSwitchOptionClick = (theme: string) => () => {
    if (theme === 'dark') {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };
  const detectCurrentTheme = () => {
    if (window.localStorage.theme === 'dark'
     || (!('theme' in window.localStorage)
      && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };
  useEffect(detectCurrentTheme, []);
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
  return (
    <>
      <nav
        className={`flex justify-center items-center px-10 h-20 ring-1 ring-slate-300
          dark:ring-slate-800`}
      >
        <SearchButton onClick={onSearchButtonClick} />
        <div className="absolute right-4 lg:right-10">
          <ThemeSwitcher
            TopButtonIcon={ThemeSwitchTopButtonIcon}
            onOptionClick={onThemeSwitchOptionClick}
          />
        </div>
      </nav>
      <main
        className={`relative mx-auto container flex justify-center items-center
          ${inter.className}`}
      >
        <SearchModal
          isOpen={isSearchModalOpen}
          isSearchQueryLoading={isSearchQueryLoading}
          query={debouncedSearchQuery}
          searchResults={searchResults}
          setIsOpen={setIsSearchModalOpen}
          setQuery={setSearchQuery}
        />
      </main>
    </>
  );
}
