export function formatDate(isoDate: string): { date: string, time: string } {
    const date = new Date(isoDate);

    const optionsDate: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'Asia/Almaty',
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Almaty',
    };

    const datePart = new Intl.DateTimeFormat('ru-RU', optionsDate).format(date);
    const timePart = new Intl.DateTimeFormat('ru-RU', optionsTime).format(date);

    return {
        date: datePart,
        time: timePart,
    };
}