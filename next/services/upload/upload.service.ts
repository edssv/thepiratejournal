import { env } from '@/env.mjs';
import { getClientUserJwt } from '@/lib/client-jwt';

export const UploadService = {
  async upload(data: FormData) {
    const jwt = await getClientUserJwt();

    return fetch(`${env.NEXT_PUBLIC_STRAPI_API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${jwt}`
      },
      body: data
    });
  }
};
