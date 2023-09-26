import {
  Dispatch,
  Fragment, SetStateAction,
} from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import SearchModalInput from '@components/atoms/SearchModal/Input';
import SearchModalNoResultsMessage from '@components/atoms/SearchModal/NoResultsMessage';
import SearchModalResultPreview from '@components/atoms/SearchModal/ResultPreview';
import { classNames } from '@utils/helpers';
import SearchModalResult from '@components/atoms/SearchModal/Result';
import { Movie, SearchPage } from '@interfaces/MovieSearch';
import SearchModalLoadingMessage from '@components/atoms/SearchModal/LoadingMessage';

type Props = {
  isOpen: boolean
  isSearchQueryLoading: boolean
  query: string
  searchResults: SearchPage | undefined
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setQuery: Dispatch<SetStateAction<string>>
};

export default function SearchModal({
  isOpen,
  isSearchQueryLoading,
  query,
  searchResults,
  setIsOpen,
  setQuery,
}: Props) {
  const hasSearchResults = query !== '' && !!searchResults?.results.length;
  const hasNoSearchResults = query !== '' && !isSearchQueryLoading && !searchResults?.results.length;
  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={`mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden
                rounded-md bg-white dark:bg-slate-700 shadow-2xl ring-1 ring-black
                ring-opacity-5 transition-all`}
            >
              <Combobox
                onChange={(movie: Movie) => {
                  window.location.href = movie.id.toString();
                }}
              >
                {({ activeOption }) => (
                  <>
                    <SearchModalInput
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Options
                      as="div"
                      static
                      hold
                      className={classNames(
                        `transition-all duration-300 max-h-[32rem] flex divide-x divide-gray-100
                        dark:divide-slate-600 dark:!border-slate-600`,
                        activeOption && !isSearchQueryLoading && 'sm:h-[32rem]',
                        isSearchQueryLoading && 'h-20',
                      )}
                    >
                      {isSearchQueryLoading && <SearchModalLoadingMessage />}
                      {hasSearchResults && (
                        <div
                          className={classNames(
                            'min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                          )}
                        >
                          <div className="-mx-2 text-sm text-gray-700">
                            {searchResults.results.map((movie) => (
                              <SearchModalResult key={movie.id} movie={movie} />
                            ))}
                          </div>
                        </div>
                      )}
                      {activeOption && <SearchModalResultPreview activeOption={activeOption} />}
                      {hasNoSearchResults && <SearchModalNoResultsMessage />}
                    </Combobox.Options>
                  </>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
