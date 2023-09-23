/* eslint-disable import/prefer-default-export */
export function classNames(...classes: (string | boolean | null)[]) {
  return classes.filter(Boolean).join(' ');
}
