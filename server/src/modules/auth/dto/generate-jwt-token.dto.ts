import { UserRole } from 'src/modules/user/entities/user.entity';

export class GenerateJwtTokenDto {
  email: string;
  sub: number;
  role: UserRole;
}
