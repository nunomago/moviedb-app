export function classNames(...classes: (string | boolean | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export const parseQueryParamToString = (input?: string | string[] | null): string => {
  if (!input) return '';

  return (Array.isArray(input) ? input.join(',') : input) ?? '';
};
