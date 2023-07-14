export interface User {
  username: string;
  firstname: string;
  lastname: string;
  image: string;
  email: string;
  provider: string;
  resetPasswordToken: string | null;
  confirmationToken: string | null;
  confirmed: boolean;
  blocked: false;
  createdAt: string;
  updatedAt: string;
}
