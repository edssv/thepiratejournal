export const getLocalStorage = (name: string) => {
  if (typeof localStorage === 'undefined') return null;

  const item = localStorage.getItem(name);

  return item ? JSON.parse(item) : null;
};
