export const getDate = (isoString: Date) => {
    const date = isoString ? new Date(isoString) : new Date();
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}

export const getTime = (isoString: Date) => {
    const date = isoString ? new Date(isoString) : new Date();

    // Convert UTC to India Standard Time (IST), which is UTC + 5:30
    const indiaTime = new Date(date.getTime());

    const hours = String(indiaTime.getHours()).padStart(2, '0');
    const minutes = String(indiaTime.getMinutes()).padStart(2, '0');
    const seconds = String(indiaTime.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
};