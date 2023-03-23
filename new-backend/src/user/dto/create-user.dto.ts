import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
    @Length(3, 16, { message: 'Длина никнейма от 3 до 16 символов' })
    username: string;

    @Length(5, 32, { message: 'Длина почтового адреса от 5 до 32 символов' })
    @IsEmail(undefined, { message: 'Не является почтовым адресом' })
    email: string;

    @IsOptional()
    @Length(8, 32, { message: 'Длина пароля от 8 до 32 символов' })
    password?: string;
}
