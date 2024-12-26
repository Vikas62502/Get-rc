
export const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

export const clearLocalStorage = () => {
    localStorage.clear();
}