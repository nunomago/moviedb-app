import Image from 'next/image';

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
  activeOption: (typeof people[0])
};

export default function SearchModalResultPreview({ activeOption }: Props) {
  return (
    <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 dark:divide-slate-600 overflow-y-auto sm:flex">
      <div className="flex-none p-6 text-center">
        <Image src={activeOption.imageUrl} width={256} height={256} alt="" className="mx-auto h-16 w-16 rounded-full" />
        <h2 className="mt-3 font-semibold text-slate-50">{activeOption.name}</h2>
        <p className="text-sm leading-6 text-gray-500 dark:text-slate-100">{activeOption.role}</p>
      </div>
      <div className="flex flex-auto flex-col justify-between p-6">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-slate-50">
          <dt className="col-end-1 font-semibold text-slate-300">Phone</dt>
          <dd>{activeOption.phone}</dd>
          <dt className="col-end-1 font-semibold text-slate-300">URL</dt>
          <dd className="truncate">
            <a href={activeOption.url} className="text-indigo-600 dark:text-teal-200 underline">
              {activeOption.url}
            </a>
          </dd>
          <dt className="col-end-1 font-semibold text-slate-300">Email</dt>
          <dd className="truncate">
            <a href={`mailto:${activeOption.email}`} className="text-indigo-600 dark:text-teal-200 underline">
              {activeOption.email}
            </a>
          </dd>
        </dl>
        <button
          type="button"
          className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send message
        </button>
      </div>
    </div>
  );
}
