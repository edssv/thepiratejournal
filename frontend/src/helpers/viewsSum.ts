import { Article } from '../redux/services/article';

export const viewsSumCalc = (data?: Article[]) => data?.reduce((a: any, b: any) => a + b.viewsCount, 0);
