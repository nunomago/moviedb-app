import { UsersIcon } from '@heroicons/react/24/outline';

export default function SearchModalNoResultsMessage() {
  return (
    <div className="px-6 py-14 text-center text-sm sm:px-14">
      <UsersIcon className="mx-auto h-6 w-6 text-gray-400 dark:text-gray-100" aria-hidden="true" />
      <p className="mt-4 font-semibold text-gray-900 dark:text-gray-50">No people found</p>
      <p className="mt-2 text-gray-500 dark:text-gray-300">
        We couldn’t find anything with that term. Please try again.
      </p>
    </div>
  );
}
