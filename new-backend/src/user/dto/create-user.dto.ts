import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'Никнейм должен быть строкой.' })
    @IsNotEmpty({ message: 'Никнейм обязательное поле.' })
    @Length(3, 16, { message: 'Длина никнейма от 3 до 16 символов.' })
    username: string;

    @IsNotEmpty({ message: 'Почтовый адрес обязательное поле.' })
    @IsEmail(undefined, { message: 'Не является почтовым адресом.' })
    @Length(5, 32, { message: 'Длина почтового адреса от 5 до 32 символов.' })
    email: string;

    // @IsOptional()
    @IsNotEmpty({ message: 'Пароль обязательное поле.' })
    @Length(8, 32, { message: 'Длина пароля от 8 до 32 символов.' })
    password: string;
}
