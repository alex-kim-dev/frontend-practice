export const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const isDarkThemePreffered = () =>
  window?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;

export const onSystemThemeChange = (cb) => {
  const themeQuery = window?.matchMedia('(prefers-color-scheme: dark)');
  themeQuery?.addListener(cb);
  return () => themeQuery?.removeListener(cb);
};
