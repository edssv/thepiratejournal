import { User } from '@/interfaces/user.interface';

export interface UserState {
    email: string;
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
