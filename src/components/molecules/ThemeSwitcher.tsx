import {
  Fragment, MouseEventHandler,
} from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/20/solid';
import ThemeSwitcherOption from '@components/atoms/ThemeSwitcherOption';

type Props = {
  onOptionClick: (theme: 'light' | 'dark') => MouseEventHandler<HTMLButtonElement>
  TopButtonIcon?: typeof SunIcon
};

export default function ThemeSwitcher({ onOptionClick, TopButtonIcon }: Props) {
  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button
          className={`inline-flex h-12 items-center justify-center hover:drop-shadow gap-x-1.5 rounded-md bg-white
            dark:bg-slate-700 px-3 py-2 text-sm font-semibold text-slate-600
            dark:text-slate-200 shadow-sm ring-1 ring-inset ring-slate-300
            dark:ring-slate-600 dark:hover:bg-slate-600`}
        >
          {TopButtonIcon && <TopButtonIcon className="h-6 w-6" aria-hidden="true" />}
          <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100
            rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5
            focus:outline-none`}
        >
          <div className="py-1">
            <ThemeSwitcherOption
              Icon={SunIcon}
              label="Light"
              onOptionClick={onOptionClick('light')}
            />
            <Menu.Item>
              <ThemeSwitcherOption
                Icon={MoonIcon}
                label="Dark"
                onOptionClick={onOptionClick('dark')}
              />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
