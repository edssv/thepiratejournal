export const SSR_URL = `${process.env.NEXT_PUBLIC_CONTAINER_SERVER_DOMAIN}/${process.env.NEXT_PUBLIC_API_PREFIX}`;
export const CLIENT_URL = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${process.env.NEXT_PUBLIC_API_PREFIX}`;

export const getContentType = () => ({
  'Content-Type': 'application/json'
});

export const errorCatch = (error: any): string => {
  const message: string = error?.response?.data?.message;

  if (message) return typeof error.response.data.message === 'object' ? message[0] : message;

  return String(error.message);
};
