import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({ message: 'Комментарий не может быть пустым' })
    body: string;

    @IsNotEmpty({ message: 'Статья, к которой нужно добавить комментарий, не найдена' })
    articleId: number;
}
