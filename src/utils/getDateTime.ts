export const getDate = (isoString: Date) => {
    const date = isoString ? new Date(isoString) : new Date();
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}

export const getTime = (isoString: Date) => {
    const date = isoString ? new Date(isoString) : new Date();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}