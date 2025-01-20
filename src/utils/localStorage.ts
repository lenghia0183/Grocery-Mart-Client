export const getLocalStorageItem = <T>(itemName: string): T | null => {
  try {
    const item = localStorage.getItem(itemName);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setLocalStorageItem = (itemName: string, value: unknown): void => {
  try {
    localStorage.setItem(itemName, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeLocalStorageItem = (itemName: string): void => {
  try {
    localStorage.removeItem(itemName);
  } catch (error) {
    console.error(error);
  }
};
