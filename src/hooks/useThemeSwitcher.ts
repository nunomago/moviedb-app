import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

/* eslint-disable import/prefer-default-export */
export const useThemeSwitcher = () => {
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
  return {
    onThemeSwitchOptionClick,
    ThemeSwitchTopButtonIcon,
  };
};
