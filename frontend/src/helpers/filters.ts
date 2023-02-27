import { plural } from './plural';

export const getShowSubscribersText = (count: number) => {
    return plural(count, [`${count} подписчик`, `${count} подписчика`, `${count} подписчиков`, `${count} подписчиков`]);
};

export const getShowCommentsText = (count: number) => {
    return plural(count, [
        `${count} комментарий`,
        `${count} комментария`,
        `${count} комментариев`,
        `${count} комментариев`,
    ]);
};

export const getShowViewsText = (count: number) => {
    return plural(count, [`${count} просмотр`, `${count} просмотра`, `${count} просмотров`, `${count} просмотров`]);
};

export const getShowMinutesText = (count: number) => {
    return plural(count, [`${count} минута`, `${count} минуты`, `${count} минут`, `${count} минут`]);
};
