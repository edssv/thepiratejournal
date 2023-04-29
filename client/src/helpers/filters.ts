import { plural } from './plural';

export const getShowSubscribersText = (count: number) =>
  plural(count, [
    `${count} подписчик`,
    `${count} подписчика`,
    `${count} подписчиков`,
    `${count} подписчиков`
  ]);

export const getShowCommentsText = (count: number) =>
  plural(count, [
    `${count} комментарий`,
    `${count} комментария`,
    `${count} комментариев`,
    `${count} комментариев`
  ]);

export const getShowViewsText = (count: number) =>
  plural(count, [
    `${count} просмотр`,
    `${count} просмотра`,
    `${count} просмотров`,
    `${count} просмотров`
  ]);

export const getShowMinutesText = (count: number) =>
  plural(count, [`${count} минута`, `${count} минуты`, `${count} минут`, `${count} минут`]);
