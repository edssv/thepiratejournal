import { User } from '@/interfaces/user.interface';
import { UserRole } from '@/lib/enums';

export interface UserState {
    id: string | number;
    email: string;
    username: string;
    image: string;
    emailVerified: boolean;
    role: UserRole;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface InitialState {
    user: UserState | null;
    isLoading: boolean;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse extends Tokens {
    user: User;
}
