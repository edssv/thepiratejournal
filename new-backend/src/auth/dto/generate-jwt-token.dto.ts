import { UserRole } from 'src/user/entities/user.entity';

export class GenerateJwtTokenDto {
    email: string;
    sub: number;
    role: UserRole;
}
