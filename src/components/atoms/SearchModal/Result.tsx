import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import Image from 'next/image';
import { classNames } from '@utils/helpers';

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
type Props = {
  person: typeof people[0]
};

export default function SearchModalResult({ person }: Props) {
  return (
    <Combobox.Option
      as="div"
      key={person.id}
      value={person}
      className={({ active }) => classNames(
        'flex cursor-default select-none items-center rounded-md p-2',
        active && 'bg-slate-100 text-slate-900 dark:text-slate-700',
      )}
    >
      {({ active }) => (
        <>
          <Image
            src={person.imageUrl}
            width={256}
            height={256}
            alt=""
            className="h-6 w-6 flex-none rounded-full"
          />
          <span className="ml-3 flex-auto truncate">{person.name}</span>
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
