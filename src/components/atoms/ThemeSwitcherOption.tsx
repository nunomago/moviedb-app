import { Menu } from '@headlessui/react';
import { SunIcon } from '@heroicons/react/20/solid';
import { classNames } from '@utils/helpers';
import { MouseEventHandler } from 'react';

type Props = {
  Icon: typeof SunIcon
  label: string
  onOptionClick: MouseEventHandler<HTMLButtonElement>
};

export default function ThemeSwitcherOption({
  Icon, label, onOptionClick,
}: Props) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          type="button"
          onClick={onOptionClick}
          className={classNames(
            active ? 'bg-gray-100 text-gray-900 dark:bg-slate-100'
              : 'text-gray-700 dark:text-slate-200',
            'group flex items-center px-4 py-2 text-sm w-full',
          )}
        >
          <Icon
            aria-hidden="true"
            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          />
          {label}
        </button>
      )}
    </Menu.Item>
  );
}
