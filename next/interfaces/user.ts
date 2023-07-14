import type { Image } from './strapi-image';

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  image: { data: Image };
  email: string;
  provider: string;
  resetPasswordToken: string | null;
  confirmationToken: string | null;
  confirmed: boolean;
  blocked: false;
  createdAt: string;
  updatedAt: string;
}
