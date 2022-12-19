export const convertDateLong = (timestamp: number | undefined) => {
    const date = Number(timestamp);
    const dateObj = new Date(date);

    const monthDay = dateObj.toLocaleString('ru-Ru', { month: 'long', day: 'numeric' });
    const hourMinute = dateObj.toLocaleString('ru-Ru', { hour: '2-digit', minute: '2-digit' });

    return `${monthDay} в ${hourMinute}`;
};

export const convertDateShort = (timestamp: number | undefined) => {
    const date = Number(timestamp);
    const dateObj = new Date(date);

    const dateShort = dateObj.toLocaleString('ru-Ru', {
        month: 'long',
        day: 'numeric',
    });

    return dateShort;
};

export const convertDateDayMonthYear = (timestamp: number | undefined) => {
    const date = Number(timestamp);
    const dateObj = new Date(date);

    const dateDayMonthYear = dateObj.toLocaleString('ru-Ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return dateDayMonthYear;
};

export const convertDateMDHM = (timestamp: number | undefined) => {
    const date = Number(timestamp);
    const dateObj = new Date(date);

    const hours = dateObj.toLocaleString('ru-Ru', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    return hours;
};
