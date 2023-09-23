import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Props = {
  onClick: () => void
};

export default function SearchButton({ onClick }: Props) {
  const isRunningOnServerSide = typeof window === 'undefined';
  const isMacOS = isRunningOnServerSide ? true : window?.navigator.userAgent.includes('Mac');
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-36 lg:w-72 px-4 h-12 bg-white dark:bg-slate-700 ring-1
        ring-slate-900/10 dark:ring-0 dark:highlight-white dark:hover:bg-slate-600 hover:drop-shadow shadow-sm rounded-md
        text-slate-500 dark:text-slate-200 text-sm group`}
    >
      <MagnifyingGlassIcon
        className={`w-4 h-4 mr-2 flex-none text-slate-300 dark:text-slate-400
          group-hover:text-nordiska-hard-blue`}
      />
      <span className="text-left flex-auto group-hover:text-nordiska-hard-blue">Search...</span>
      <kbd className="font-medium flex flex-row gap-px leading-5">
        {isMacOS && <abbr title="Command" className="no-underline text-lg leading-5">⌘</abbr>}
        {!isMacOS && <abbr title="Control" className="no-underline text-xs pr-px leading-5">Ctrl</abbr>}
        {' '}
        <span className="text-sm">K</span>
      </kbd>
    </button>
  );
}
