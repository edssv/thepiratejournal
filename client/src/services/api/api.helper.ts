export const SSR_URL = process.env.NEXT_PUBLIC_CONTAINER_SERVER_DOMAIN + '/' + process.env.NEXT_PUBLIC_API_PREFIX;
export const CLIENT_URL = process.env.NEXT_PUBLIC_SERVER_DOMAIN + '/' + process.env.NEXT_PUBLIC_API_PREFIX;

export const getContentType = () => ({
  'Content-Type': 'application/json',
});

export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message ? (typeof error.response.data.message === 'object' ? message[0] : message) : error.message;
};
