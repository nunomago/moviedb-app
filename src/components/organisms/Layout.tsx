import SearchButton from '@components/atoms/SearchButton';
import SearchModal from '@components/molecules/SearchModal';
import ThemeSwitcher from '@components/molecules/ThemeSwitcher';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { useSearch } from '@hooks/useSearch';
import { useThemeSwitcher } from '@hooks/useThemeSwitcher';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children?: ReactNode
};

export default function Layout({ children }: Props) {
  const {
    debouncedSearchQuery,
    isSearchModalOpen,
    isSearchQueryLoading,
    onSearchButtonClick,
    searchResults,
    setIsSearchModalOpen,
    setSearchQuery,
  } = useSearch();
  const {
    onThemeSwitchOptionClick,
    ThemeSwitchTopButtonIcon,
  } = useThemeSwitcher();

  return (
    <>
      <nav
        className={`flex justify-center items-center px-10 h-20 ring-1 ring-slate-300
          dark:ring-slate-800`}
      >
        <Link
          href="/"
          className={`absolute left-4 md:left-10 font-semibold bg-light-primary p-2 rounded-md
            text-white dark:text-white text-xl hover:drop-shadow shadow-sm ring-1
              ring-slate-900/10`}
        >
          MovieDB App
        </Link>
        <SearchButton onClick={onSearchButtonClick} />
        <div className="absolute right-4 md:right-10">
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
        {children}
      </main>
    </>
  );
}
