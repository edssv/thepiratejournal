import { UserRole } from '../lib/enums/user-role.enum';
export interface UserInfo {
    _id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean | null;
}

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
}
