import type { ParsedUrlQuery } from 'querystring';

export interface Params extends ParsedUrlQuery {
  id: string;
}
