import {
  Dispatch,
  Fragment, SetStateAction, useState,
} from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import SearchModalInput from '@components/atoms/SearchModal/Input';
import SearchModalNoResultsMessage from '@components/atoms/SearchModal/NoResultsMessage';
import SearchModalResultPreview from '@components/atoms/SearchModal/ResultPreview';
import { classNames } from '@utils/helpers';
import SearchModalResult from '@components/atoms/SearchModal/Result';

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Foo bar',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'John Doe',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Chairman',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
];

const recent = [people[1], people[2]];

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
};

export default function SearchModal({ isOpen, setIsOpen }: Props) {
  const [query, setQuery] = useState('');
  const filteredPeople = query === ''
    ? []
    : people.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));
  const hasNoSearchQuery = query === '';
  const hasSearchResults = query !== '' && filteredPeople.length > 0;
  const hasNoSearchResults = query !== '' && !filteredPeople.length;
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
                rounded-xl bg-white dark:bg-slate-700 shadow-2xl ring-1 ring-black
                ring-opacity-5 transition-all`}
            >
              <Combobox
                onChange={(person: (typeof people[0])) => {
                  window.location.href = person.profileUrl;
                }}
              >
                {({ activeOption }) => (
                  <>
                    <SearchModalInput
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    {(hasNoSearchQuery || hasSearchResults) && (
                    <Combobox.Options
                      as="div"
                      static
                      hold
                      className={`flex divide-x divide-gray-100 dark:divide-slate-600
                        dark:!border-slate-600`}
                    >
                      <div
                        className={classNames(
                          'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                          activeOption && 'sm:h-96',
                        )}
                      >
                        {!hasSearchResults && (
                        <>
                          <h2
                            className={`mb-4 mt-2 text-xs font-semibold text-gray-500
                              dark:text-slate-300`}
                          >
                            Recent searches
                          </h2>
                          <div className="-mx-2 text-sm text-gray-700 dark:text-slate-50">
                            {recent.map((person) => (
                              <SearchModalResult key={person.id} person={person} />
                            ))}
                          </div>
                        </>
                        )}
                        {hasSearchResults && (
                          <div className="-mx-2 text-sm text-gray-700">
                            {filteredPeople.map((person) => (
                              <SearchModalResult key={person.id} person={person} />
                            ))}
                          </div>
                        )}
                      </div>
                      {activeOption && <SearchModalResultPreview activeOption={activeOption} />}
                    </Combobox.Options>
                    )}
                    {hasNoSearchResults && <SearchModalNoResultsMessage />}
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
