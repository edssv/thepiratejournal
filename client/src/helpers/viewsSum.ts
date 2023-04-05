import { Article } from '../interfaces/article.interface';

export const viewsSumCalc = (data?: Article[]) => data?.reduce((a: any, b: any) => a + b.viewsCount, 0);
